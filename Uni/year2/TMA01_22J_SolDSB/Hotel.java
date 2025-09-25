import java.util.ArrayList; //imports ArrayList from the java.util package (Q2(b))
import java.util.Iterator; //imports Iterator from the java.util package (Q2(i))
/**
 * Q2(a) create a public class called Hotel in the same BlueJ project.
 * Edit the class comment so that it includes your own name and the date
 * and a description of the class Hotel. Remove the sample field, constructor, and method.
 * Write a description of class Hotel here.
 *
 * @author (David Shaun Brown)
 * @version (2022.12.06)
 */
public class Hotel
{
    /**
     * (b)In the class Hotel add two private fields:
     * rooms, which is an ArrayList of Room, used to keep a record of rooms in the hotel
     * name, a String representing the name of the hotel.
     */
    //An array list for storing room details
    private ArrayList<Room>rooms;
    //represents name of hotel
    private String name;
    /**
     * (c)Add a public constructor with one String parameter called aName to the Hotel class.
     * The constructor should use its parameter to set the hotel’s name.
     * The constructor should also initialize the hotel’s field rooms to an empty collection
     *of the appropriate type.
     */
    public Hotel(String aName)
    {
        name = aName; //sets the hotels name
        rooms = new ArrayList<>(); // initialises the field rooms to an empty collection
    }

    /**
     * Use the following method in Question 2 part (d)
     * (d) Adds some unoccupied test rooms to the hotel
     */
    public void addRooms()
    {
        int i = 10;
        while (i < 19) {
            String number = "" + i;
            double rate;

            if(i % 3 == 1) {
                number += "A";
                rate = 100;
            }
            else if (i % 3 == 2) {
                number += "B";
                rate = 180;
            }
            else
            {
                number += "C";
                rate = 250;
            }

            Room r = new Room("", number, rate);

            rooms.add(r);
            i++;
        }
    }

    /**
     * (e)calculateBill(Room, int) will calculate a bill for a room that is being vacated.
     * The method has a parameter for the Room and the number of days the room was occupied.
     * Calculate a bill for the room as its daily rate multiplied by the number of days the room was occupied.
     * If the room was occupied for at least four days, a 10% discount to the overall bill is applied.
     * The method should return the bill as a double value.
     * You may assume that the number of days is at least 1.
     */
    public double calculateBill(Room room, int daysOccupied)
    {
        if(daysOccupied>=4){
            return (room.getDailyRate()*daysOccupied*0.9); //applies discount if stay is 4 days or over and calculates bill
        }
        else{
            return (room.getDailyRate()*daysOccupied); //calculates bill
        }
    }

    /**
     * (f) getMatchingRooms(String) receives the type of a Room as a parameter 
     * and returns an ArrayList of rooms in the hotel whose types match the parameter and which are unoccupied.
     * For example, calling the method with the parameter "Single" will return a list of all free rooms whose type is single.
     */

    public ArrayList<Room> getMatchingRooms(String roomType )
    // searches for matching room type
    {
        String beds = roomType;
        ArrayList<Room> MatchingRooms = new ArrayList<Room>();
        for(Room room : rooms){
            if(room.getType() == beds ){
                MatchingRooms.add(room);
            }
        }
        return MatchingRooms;
    }

    /**
     * (g) vacancies() takes no parameters and returns the number of vacancies in the hotel rooms list as an int,
     * based on 1 vacancy for every single room, 2 for every double room,
     * and 4 for every family room that is unoccupied.
     */
    public int vacancies()
    // calculates number of vacancies in hotel
    {
        int vacancy = 0;
        for(Room room : rooms){
            if(room.isAvailable()){
                if(room.getType() == "Single"){
                    vacancy = vacancy +1;
                }
                else if(room.getType() == "Double"){
                    vacancy = vacancy + 2;
                }
                else {
                    vacancy = vacancy + 4;
                }
            }

        }
        return vacancy;
    }

    /**
     * (h) bookRoom(Room) takes a Room as an argument and searches the rooms list for a room with a matching number.
     * If a ma tch is found, the hotel room concerned has its guest field set to a dummy value "Guest".
     * If no match is found the method does nothing. (Assume that room numbers are unique.)
     */ 
    public void bookRoom(Room aRoom)
    // allows room to be booked if room matches
    {
        String match = aRoom.getNumber();
        ArrayList<Room> bookRoom = new ArrayList<Room>();
        for(Room room : rooms){
        if(room.getNumber() == match ){
            bookRoom.add(room);
        }
        room.setGuest("Guest");
    }
}

    /**
     * (i) removeRoom(String) is used to take a room out of service.
     * It takes a room number as an argument and removes from the rooms collection the room with a matching number, if the number is found. 
     * If the room is not found the method prints "Room <number> not found!" where <number> is the room number that was not found.
     */
    public void removeRoom(String Number)

    // removes room from list of rooms
    {
        Iterator<Room> it = rooms.iterator();
        while(it.hasNext()){
            Room r = it.next();
            String number = r.getNumber();
            if(Number.equals(r)){
                it.remove();
            }
            else{
                System.out.println ("Room " + number + " not found!");

            }
        }
}
}
