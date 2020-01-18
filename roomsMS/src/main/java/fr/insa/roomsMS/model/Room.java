package fr.insa.roomsMS.model;

public class Room {
	
	// Location
	private String building;
	private int floor;
	private String name;
	
	// Constructor	
	public Room(String building, int floor, String name) {
		super();
		this.building = building;
		this.floor = floor;
		this.name = name;
	}

	
	// Getters & Setters
	public String getBuilding() {
		return building;
	}


	public void setBuilding(String building) {
		this.building = building;
	}


	public int getFloor() {
		return floor;
	}


	public void setFloor(int floor) {
		this.floor = floor;
	}


	public String getName() {
		return name;
	}


	public void setName(String name) {
		this.name = name;
	}

}
