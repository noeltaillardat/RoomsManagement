package fr.insa.roomsMS.resources;

import java.util.ArrayList;
import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import fr.insa.roomsMS.model.*;

@RestController
public class RoomResource {
	List<Room> roomDB = new ArrayList<>();

	public RoomResource() {
		// Database:
		roomDB.add(new Room("GEI", 0, "PTP_Energy",		19, 1, 1));
		roomDB.add(new Room("GEI", 0, "Foyer_du_GEI",	18, 1, 1));
		roomDB.add(new Room("GEI", 0, "13",				 4, 3, 1));
		roomDB.add(new Room("GEI", 0, "15",				 1, 3, 1));
		roomDB.add(new Room("GEI", 0, "17",				 0, 1, 1));

		roomDB.add(new Room("GEI", 1, "107",			 6, 2, 1));
		roomDB.add(new Room("GEI", 1, "109",			 8, 2, 1));
	}
	
	// All rooms 
	@CrossOrigin
	@GetMapping("/all")
	public List<Room> getRooms() {
		return roomDB;
	}
	
	// All rooms of a building
	@CrossOrigin 
	@GetMapping("/all/{building}")
	public List<Room> getRooms(@PathVariable String building) {
		List<Room> returned = new ArrayList<>();		
		for (Room room : roomDB)
			if (room.getBuilding().equals(building))
				returned.add(room);
		return returned;
	}

	// All rooms' IDs, like "{building}/{room}" 
	@CrossOrigin
	@GetMapping("/all-id")
	public List<String> getRoomsID() {
		List<String> returned = new ArrayList<>();		
		for (Room room : roomDB)
			returned.add(room.getBuilding()+"/"+room.getName());
		return returned;
	}

}
