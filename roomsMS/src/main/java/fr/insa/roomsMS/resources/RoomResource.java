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
		roomDB.add(new Room("GEI", 0, "Foyer_du_GEI"));
		roomDB.add(new Room("GEI", 0, "13"));
		roomDB.add(new Room("GEI", 0, "15"));
		roomDB.add(new Room("GEI", 1, "102"));
		roomDB.add(new Room("GEI", 1, "107"));
		roomDB.add(new Room("GEI", 1, "109"));
		roomDB.add(new Room("GEI", 2, "213"));
		roomDB.add(new Room("GEI", 2, "Learning_room"));
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

	// Floor of a room
	@CrossOrigin
	@GetMapping("/INSA/{building}/{room}/floor")
	public List<String> getRoomFloor(@PathVariable String building, @PathVariable String room) {
		List<String> returned = new ArrayList<>();	
		
		for (Room aRoom : roomDB) {
			if (aRoom.getName().equals(room) && aRoom.getBuilding().equals(building)) {
				switch (aRoom.getFloor()) {
					case 0:
						returned.add("rdc");
						break;
					case 1:
						returned.add("1st");
						break;
					case 2:
						returned.add("2nd");
						break;
					case 3:
						returned.add("3rd");
						break;
					default:
						returned.add(aRoom.getFloor() + "th"); 	
				}
			}
		}
		if (returned.size() == 0) 
			returned.add("404");
		return returned;
	}
}
