package fr.insa.roomsMS.model;

public class Room {
	
	// Location
	private String building;
	private int floor;
	private String name;
	
	// Physical location (for the UI)
	
	/* Each building is basically made like this;
	 *  ------------------------------
	 *  |x:0  |  |  |   |   |    |   | n rooms (y: 0)
	 *  ---- --- -- --- --- ---- --- - 
	 *  |                            | corridor
	 *  ---- --- -- --- --- ---- --- -
	 *  |     |  |  |   |   |    |   | n rooms (y: 1)
	 *  ------------------------------ 
	 */
	private int x;
	private int xSize; // 1: tiny (meetings); 2: usual; 3: big (theaters) 
	private int y; // 2 "rows" > 0: north side of the building, 1: south side
	
	
	// Constructor	
	public Room(String building, int floor, String name, int x, int xSize, int y) {
		super();
		this.building = building;
		this.floor = floor;
		this.name = name;
		this.x = x;
		this.xSize = xSize;
		this.y = y;
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


	public int getX() {
		return x;
	}


	public void setX(int x) {
		this.x = x;
	}


	public int getxSize() {
		return xSize;
	}


	public void setxSize(int xSize) {
		this.xSize = xSize;
	}


	public int getY() {
		return y;
	}


	public void setY(int y) {
		this.y = y;
	}

}
