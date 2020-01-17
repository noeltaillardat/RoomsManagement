package fr.insa.lightsMS;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import fr.insa.lightsMS.model.Light;
import fr.insa.lightsMS.resources.LightResource;

@SpringBootApplication
public class LightsMsApplication {
	
	HashMap<String, Light> lights = new HashMap<>();
	
	public static void main(String[] args) {
		SpringApplication.run(LightsMsApplication.class, args);
		// Flag to check only each new minute
		int checkedMin = 0;
		while(true) {
			// Gets the hours and minutes in real time
			TimeManagement time = new TimeManagement();
			int hour = time.getHour();  // Returns the hour 
			int min = time.getMinute();  // Returns the hour
			
			// Check if the hours and minutes are correct => OK
			// System.out.println(hour);
			// System.out.println(min);
		
			if (checkedMin != min) {
				checkedMin = min;
				// For each scheduled time stored in the array
				for (String[] scheduled : LightResource.arrays) {
										
					// For every item on our list, we split the array into hour, minute and seconds
					String time_sched[] = scheduled[3].split(":", 3);
					
					// Test the splitting is made correctly => OK
					// System.out.println(time_sched[0]);
					// System.out.println(time_sched[1]);
					// System.out.println(time_sched[2]);
					
					// If the hour scheduled is equal to the actual hour and no action has been made on the lights yet
					if (Integer.parseInt(time_sched[0]) == hour) {
			            // We compare the minutes, if the minutes schedules are greater than the real minutes
						if (Integer.parseInt(time_sched[1]) <= min) {
							//Implement the scheduled action => Turn on or off the lights
							LightResource.setLightStatus(scheduled[0], scheduled[1], scheduled[2]);
							//Log & Debug
							System.out.println("-- Action on light! " + scheduled[0]+"/"+scheduled[1] + " to " + scheduled[2]); 					
						}
					}
					
				}
			}		
		}
	}	

}
