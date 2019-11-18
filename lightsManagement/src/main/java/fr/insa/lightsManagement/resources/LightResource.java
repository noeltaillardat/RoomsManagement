package fr.insa.lightsManagement.resources;

import org.springframework.web.bind.annotation.RestController;

import fr.insa.lightsManagement.Light.Light;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@RestController
public class LightResource {
	@GetMapping("/light")
	public int lightID() {
		return 20;
	}
	
	@GetMapping(value="/INSA/{building}/{roomID}/light")
	public Light infoLight(@PathVariable String building, @PathVariable int roomID) {
		Light light = new Light(roomID, true);		
		return light;
	}
	
	// Turn the light on
	@GetMapping(value="/INSA/{building}/{roomID}/light/on")
	public Light light_on(@PathVariable String building, @PathVariable int roomID) {
		Light light = new Light(roomID, true);		
		return light;
	}
	
	// Turn the light off
	@GetMapping(value="/INSA/{building}/{roomID}/light/off")
	public Light light_off(@PathVariable String building, @PathVariable int roomID) {
		Light light = new Light(roomID, false);		
		return light;
	}
	
	// Turn the light on or off
	@GetMapping(value="/INSA/{building}/{roomID}/light/{status}")
	public Light light_on_off(@PathVariable String building, @PathVariable int roomID, @PathVariable String status) {
		boolean light_on = false;
		
		if (status == "on") light_on = true;
		else if (status == "off") light_on = false;
		
		Light light = new Light(roomID, light_on);
		
		return light;
	}
}
