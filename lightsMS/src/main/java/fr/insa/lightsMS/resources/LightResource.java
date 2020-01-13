package fr.insa.lightsMS.resources;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import fr.insa.http.HTTPManagement;
import fr.insa.lightsMS.model.Light;


@RestController
public class LightResource {
	// Database of lights' states
	static String IN_INSA = "http://127.0.0.1:8081/~";
	static String ROOM_MS = "http://localhost:8091";
	
	public LightResource() {
	}

	@CrossOrigin
	@GetMapping(value="/INSA/lights")
	public static List<Light> getAllLights() {
		List<Light> lights = new ArrayList<>();
		
		RestTemplate restTemplate = new RestTemplate();
		String[] roomsID = restTemplate.getForObject(ROOM_MS + "/all-id", String[].class);
		
		// Fill the simulated DB with a list that contains the light of all rooms
		for (String roomID : roomsID) {
			String[] buildingRoom = roomID.split("/",2);
			System.out.println(buildingRoom[0] + " " + buildingRoom[1]);
			lights.add(new Light(roomID, getLightStatus(buildingRoom[0], buildingRoom[1]).equals("true")));
		}
		return lights;
	}

	@CrossOrigin
	@GetMapping(value="/INSA/{building}/{room}/light")
	public static String getLightStatus(@PathVariable String building, @PathVariable String room) {
		String res = "false";
		
		RestTemplate restTemplate = new RestTemplate();
		String floor =  restTemplate.getForObject(
				ROOM_MS + "/INSA/" + building + "/" + room + "/floor", 
				String.class);

		try {	
			res = HTTPManagement.extractContent(
				HTTPManagement.sendGET(
					// IN INSA
					IN_INSA + 
					// MN corresponding to the floor of the good building
					"/mn-cse-" + floor + 
					"/mn-" + building + "-" + floor + 
					// roomID
					"/" + building + "_" + room +
					// getLight ('la' stands for 'latest')
					"/cnt-light/ol"),
				// extract state
				"state");
		} catch (IOException e) {
			e.printStackTrace();
		}		
		return res;
	}

	@CrossOrigin
	@GetMapping(path="/INSA/{building}/{room}/light/{state}")
	public static int setLightStatus(@PathVariable String building, @PathVariable String room, @PathVariable String state) {
		String newState = "false";
		RestTemplate restTemplate = new RestTemplate();
		String floor =  restTemplate.getForObject(
				ROOM_MS + "/INSA/" + building + "/" + room + "/floor", 
				String.class);
		
		if (floor.equals("404")) {
			return 404;
		} else {
			switch (state) {
				case "true":
				case "on":
					newState = "true";
					break;
	
				case "false":
				case "off":
					newState = "false";
					break;
			}
			try {	
				HTTPManagement.sendPOSTActuator(
					// IN INSA
					IN_INSA + 
					// MN corresponding to the floor of the good building
					"/mn-cse-" + floor + 
					"/mn-" + building + "-" + floor + 
					// roomID
					"/" + building + "_" + room +
					// getLight ('la' stands for 'latest')
					"/cnt-light",
					
					// state
					newState);
			} catch (IOException e) {
				e.printStackTrace();
			}
			return 0;
		}
	}	
}
