
/**
 * Q1 (a)
 * Room allows user to interact with a collection of rooms.
 * Interaction allows users to:
 * Book a room
 * Print a list of rooms
 * Calculate bill for room
 * Verify the format of a room's number
 * @author (David Shaun Brown)
 * @version (2022.12.04)
 */
public class Room
{
    /** Q1 (b) Now add the following private fields to the Room class:
     * guest, the person who booked the room, which is a String
     * number, an identifier for the room, which is a String
     * dailyRate, which is a double value giving the standard daily rate for the room.
     * */
    // name of guest staying in the room
    private String guest;
    // hotel room number
    private String number;
    // standard daily rate of room in £
    private double dailyRate;

    /**
     * Q1 (c) Add a constructor to the class Room with the modifier and header
     * public Room(String aGuest, String aNumber, double aRate)
     * The constructor uses its three parameters to set the values of the corresponding fields.
     */
    public Room(String aGuest, String aNumber,double aRate)
    {
        guest = aGuest;
        number = aNumber;
        dailyRate = aRate;

    }

    /**
     * Q1 (d) Now add the following public methods to the Room class:
     * (i) Getter methods for the three fields, with names getGuest, getNumber, and getDailyRate.
     * Returns the name of guest
     */
    public String getGuest()
    {
        return guest; //returns name of guest

    }

    /**
     * Returns the room number
     */
    public String getNumber()
    {
        return number; // returns room number

    }

    /**
     * Returns the daily rate of room in £
     */
    public double getDailyRate()
    {
        return dailyRate; // returns daily rate of room

    }

    /**
     * (d)(ii) A setter method for the guest field, called setGuest.
     */
    public void setGuest(String newGuest)
    {
        this.guest = newGuest ; // sets new guest name

    }

    /**
     * (d)(iii) .A setter method for the dailyRate field, called setDailyRate.
     */
    public void setDailyRate(double newDailyRate)
    {
        this.dailyRate = newDailyRate; // sets new daily rate
    }

    /** 
     * Q1(e) Add a method to tell if the room is available or not, called isAvailable. 
     * The method takes no parameters and returns true if the room is available, 
     * and otherwise returns false.
     * A room is considered available if its guest is an empty string
     * (i.e., a string of length 0).
     */
    public boolean isAvailable()
    {
        /**
         * checks if the string length stored in guest is zero to see if room available
         */
        if(guest.length() ==0) {
            return true ;
        }
        /**
         * if string length is anything other than zero then room is unavailable
         */
        else {
            return false ;
        }
    }

    /**
     * Q1(f)Add a method verifyRoom() that returns true if the room has a valid number, and otherwise returns false.
     * A room number string must be 3 characters in length, otherwise the method returns false.
     * The first two characters should represent a room number from one to ninety-nine, which in string form are represented as "01" to "99", otherwise the room number is invalid.
     * The third character in the room number must be either 'A' or 'B' or 'C', otherwise the room number is invalid.
     */
    public boolean verifyRoom()
    {
        if (number.length()==3) {
            if(((number.charAt(0)=='0' && number.charAt(1) !='0')  || (number.charAt(0) !='0' && number.charAt(1)>='0')) &&(number.charAt(2)=='A' || number.charAt(2)=='B' || number.charAt(2)=='C')){
                return true ;
            }
            else{
                return false ; 
            }
        }
        else {
                return false ;
            }
        }
    

    /**
     *Q1 (g) Add a method getType that returns a string describing the type of the room, based on the room number's third character. 
     * You may assume that the room number is valid.
     * If the room number's third character is 'A' the method returns "Single". If the room type is 'B', the method returns "Double", otherwise the method returns "Family".
     */
    public String getType()
    {
        if(number.charAt(2)=='A'){ //returns single room if character at index 2 is A
            return "Single";
        }
        else if(number.charAt(2)=='B'){ // returns double room if character at index 2 is B
            return "Double" ;
        }
        else {
            return "Family" ; // otherwise family room is returned
        }
    }

    /**
     * Q1 (h) Add a method called description that takes no parameters and returns a string describing the room, using the following format:
     * type room number (availability) guest
     * Here the type and number should be replaced by the actual type and number of the room. For example, the method might return the string
     * Single room 21A (available)
     * or
     * Single room 21A (reserved) Joe Bloggs
     * depending on whether the room is available or not, as determined by its isAvailable method.
     */
    public String description()
    {
        if (isAvailable() ==true){ //if room is availble150315
            return getType() + " room " + getNumber() + " (available) " ;

        }
        else { // if room isn't available
            return getType() + " room " + getNumber() + " (reserved) " + getGuest() ; 
        }
    }
}
