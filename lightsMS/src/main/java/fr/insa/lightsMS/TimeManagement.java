package fr.insa.lightsMS;

import java.util.Calendar;
import java.util.Date;
import java.util.GregorianCalendar;

public class TimeManagement {
	

	public int getMinute(){
		Date date = new Date();	// Given date
		Calendar calendar = GregorianCalendar.getInstance(); //Creates a new calendar instance
		calendar.setTime(date); //Assigns calendar to a given date
		return calendar.get(Calendar.MINUTE); //Returns hour in 24h format
	}

	public int getHour() {
		Date date = new Date();	// Given date
		Calendar calendar = GregorianCalendar.getInstance(); //Creates a new calendar instance
		calendar.setTime(date); //Assigns calendar to a given date
		return calendar.get(Calendar.HOUR_OF_DAY);
	}

}
