package fr.insa.lightsManagement.Light;

public class Light {
	private int roomID;		// all the lamps of a room are controlled
	private boolean status;		// status is on (true) or off (false)
	
	public Light(int roomID, boolean status) {
		this.roomID = roomID;
		this.status = status;
	}
	
	public int getId() {
		return this.roomID;
	}
	
	public void setId(int roomID) {
		this.roomID = roomID;
	}
	
	public boolean getStatus() {
		return this.status;
	}
	
	public boolean setStatus(boolean status) {
		return this.status = status;
	}	
}
