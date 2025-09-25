import java.util.Objects;

/** 
 * A Gate in an airport that requires a bus instead of a walkway
 * It has a number and is for arrival or departure
 * It's used for a particular flight number and may be open and closed for passengers
 * Also denotes if a passenger lift is available
 * 
 * @author David Shaun Brown
 * @version 2023.05.01
 * Question bi) Alter the BusGate class so that it is a subclass of Gate
 */
public class BusGate extends Gate 
{
    private boolean liftAvailable; // true if the gate has a passenger lift, false otherwise
    public static final int BUS_CAPACITY = 78; // sets passenger capacity for the bus

    /**
     * Question 1 bii) Write a public constructor for BusGate
     * 
     * Constructor for the subclass BusGate
     * @param  int gateNum - the gate number
     * @param boolean arrival - true for arrival, false for departure
     * @param String fltNum - the flight number of plane using the gate
     * @param boolean liftAvailable - true if lift isAvailable, false otherwise
     */
    public BusGate(int gateNum, boolean arrival, String fltNum, boolean liftAvailable)
    {
        super(gateNum, arrival, fltNum);
        this.liftAvailable = liftAvailable; //sets liftAvailable to false
    }

    //********************Provided code*******************
    /**
     * Find the number of bus journeys required to transport
     * passengers to or from a plane.
     * @param paxNum The number of passengers
     * @return The whole number of bus journeys that will be
     * needed to transport the number of pasengers.
     */  
    public static int busJourneys(int paxNum)
    {
        return intCeil(paxNum, BusGate.BUS_CAPACITY);
    }    

    private static int intCeil(int a, int b)
    {
        return (a + b - 1) / b;
    }

    /**
     * Question 1 biv) Write a toString method in BusGate that overrides that in Gate
     * 
     * Method that overrides that in Gate adding the availability of a passengerlift
     * @return string representation of a BusGate
     */
    @Override
    public String toString()
    {
        String outputString = super.toString() + "\n";
        if (liftAvailable == true) {
            outputString += " A lift is available";
        }
        else {
            outputString += " A lift is not available";
        }

        return outputString;
    }

    /** Question 1 bv) add an equals method to BusGate to override equals in Gate class
     * 
     * overriding equals method in Gate class
     * @param BusGate object
     * @return true if BusGate objects are the same (gate number, flight number and lift availability)
     * otherwise return false 
     */
    @Override 
    public boolean equals (Object obj)
    {
       if (this == obj) {
            return true; // if object is compared with itself then return true
        }
        if (!(obj instanceof BusGate)) { //checks obj is an instance of BusGate
            return false;
        }
        BusGate other = (BusGate) obj; //sets object to compare against
        if (getGateNum() == other.getGateNum() && // checks for matching gate numbers 
        getFltNum().equals(other.getFltNum()) && //and flight number
        liftAvailable == other.liftAvailable) {  //and available lift      
            return true;
        }
        else {
            return false;
        }
    }


    /**pass
     * Question 1 bvi) Add public hashcode method
     * 
     * Adds a hashCode method to BusGate using the Objects.hash method, passing to it
     * @param gate number and
     * @param flight number
     * @param is lift available
     * 
     * @return a hashCode
     * 
     */

    public int hashCode()
    {
        return Objects.hash(getGateNum(), getFltNum(), liftAvailable);
    }

}


    
