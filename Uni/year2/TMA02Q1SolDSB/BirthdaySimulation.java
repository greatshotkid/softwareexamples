// Q1 (a) importing java.util.ArrayList
// and java.util.Random classes
import java.util.ArrayList;
import java.util.Random;
/**
 * Q1 (a)
 * Birthday simulation 
 * Simulates a meeting of a given size and 
 * assigns random birthdays to attendees.
 * Using this will determine probability that 
 * two attendees have the same birthday in a meeting
 * of the given size.
 * @author (David Shaun Brown)
 * @version (20.23.02.23)
 */
public class BirthdaySimulation
{
    /** Q1 (b)
     * Declaring public field bdays, which will reference
     * an ArrayList of String objects.
     * These objects represent birthdays
     * of attendees at a meeting.
     */
    public ArrayList<String> bdays;

    public BirthdaySimulation()
    {
        // Q1 (b) initialises bdays to a new
        // empty instance of ArrayList.
        bdays= new ArrayList<>();
    }

    /** Q1 (c)
     * creating method public String ranMonth()
     * 
     * generate a randomly chosen month
     * between 0 and 11 (inclusive)
     *
     * @return a random int between 0 and 11 inclusive
     * which then coverts the random number into a month
     * using the switch statement
     * @return a string of the month for ranMonth()
     */
    public String ranMonth()
    {
        Random ran = new Random();
        int myRandomNumber = ran.nextInt(11) + 1;
        String myMonth = "";
        switch (myRandomNumber){
            case 0: myMonth = "January";
            break;
            case 1: myMonth = "February";
            break;
            case 2: myMonth = "March";
            break;
            case 3: myMonth = "April";
            break;
            case 4: myMonth = "May";
            break;
            case 5: myMonth = "June";
            break;
            case 6: myMonth = "July";
            break;
            case 7: myMonth = "August";
            break;
            case 8: myMonth = "September";
            break;
            case 9: myMonth = "October";
            break;
            case 10: myMonth = "November";
            break;
            case 11: myMonth = "December";
            break;

        }
        return myMonth;

    }

    /**Q1 (d)
     * creating method public in ranDateInMonth(String aMonth)
     * Calulates a random date of the month for the input given
     * Formula (max-min+1)+min gives range of days to randomly choose from
     * @param aMonth a month of the year
     * 
     * @return returns a random date in the month given
     */
    public int ranDateInMonth(String aMonth)
    {
        Random ran = new Random(); //creates a new random number
        int aDate = 0; 
        switch (aMonth){
            case "January": aDate = ran.nextInt(31-1+1) + 1;
            break;
            case "February": aDate = ran.nextInt(3) + 1;
            switch (aDate){
                case 0 : aDate = ran.nextInt(29-1+1) + 1;
                break;
                default: aDate = ran.nextInt(28-1+1) +1;
                break;
            }
            return aDate;
            case "March": aDate = ran.nextInt(31-1+1)+ 1;
            break;
            case "April": aDate = ran.nextInt(30-1+1)+ 1;
            break;
            case "May": aDate = ran.nextInt(31-1+1)+ 1;
            break;
            case "June": aDate = ran.nextInt(30-1+1)+ 1; //(max - min + 1) + min
            break;
            case "July": aDate = ran.nextInt(31-1+1)+ 1;
            break;
            case "August": aDate = ran.nextInt(31-1+1)+ 1;
            break;
            case "September": aDate = ran.nextInt(30-1+1)+ 1;
            break;
            case "October": aDate = ran.nextInt(31-1+1)+ 1;
            break;
            case "November": aDate = ran.nextInt(30-1+1)+ 1;
            break;
            case "December": aDate = ran.nextInt(31-1+1)+ 1;
            break;
        }
        return aDate;
    }

    /**Q1 (e) 
     * Creating a method with header public void createMeeting(int numAttendees)
     * @param numAttendees number of people at meeting
     * Sets variable attendees to numAttendees
     * A counter is initialised
     * For the number of attendees, a random month and date
     * are generated and added to the ArrayList bdays
     */
    public void createMeeting(int numAttendees)
    {
        //invoking clear on bdays
        bdays.clear();
        // setting variable for numAttendees
        int attendees = numAttendees;

        for (int i=0; i<=attendees-1; i++) {//creates a index variable for a counter
            String month = ranMonth();
            int date = ranDateInMonth(month);
            bdays.add(date + " " + month);

        }
    }

    /**Q1 (f)
     * Creating a method with header public boolean foundMatch()
     * which checks if at least one  repeated birthday in bdays
     * or false otherwise
     * 
     * @return a boolean value true, if there are repeated birthdays
     * and false if not
     */

    public boolean foundMatch()
    {
        boolean match = false;
        for (int i = 0; i<bdays.size(); i++) //loops through all items in bdays
        {

            for (int j=i+1; j< bdays.size(); j++){ //loops through every item in bdays
                if (bdays.indexOf(i) == (bdays.indexOf(j))) { //compares every item in outer loop with item in inner loop
                    match = true;

                }
                else {
                    match = false;

                }
            }
        }
        return match;
    }

    /**Q1 (g)
     * Creates a method with heaeder public double runSimulation(int numAttendees)
     * Method takes a variable count to count how manymeetings
     * with numAttendees people include at least one pair of people
     * with amatching birhday
     * 
     * @param an integer for numAteendees
     * @return percentage chance of a meeting have matching birthdays
     */

    public double runSimulation(int numAttendees)
    {
        bdays= new ArrayList<>(); //initialises bdays to an empty ArrayList
        int count = 0; //initialises count variable to 0

        for (int i = 0 ;  i<=10000; i++)
        {
            createMeeting(numAttendees);

            if (foundMatch() == true) {
                count++; //if matching birthday found increases count by 1
            }
            
        }
        // reinitialises bdays to an empty ArrayList
        bdays = new ArrayList<>();
        //Calulates percentage of time a meeting of a given number
        //of attendees will have at least one matching pair of birthdays
        double percentage = (count/10000.0)*100;

        return percentage;

    }
}

