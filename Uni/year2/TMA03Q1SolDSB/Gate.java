import java.util.Objects;

/** 
 * A Gate in an airport has a number and is for an arrival or departure. 
 * It is used for a particular flight number and it may be open or 
 * closed for passengers.
 * @author David Shaun Brown 
 * @version 2023.05.01
 */
public class Gate
{
    private int gateNum;      // the gate number
    private boolean arrival;  // true for arrival, false for departure 
    private String fltNum;    // the flight number of the plane using the gate
    private boolean open;     // true if the gate is open

    /**
     * Question 1 ai) Add a public constructor to the class Gate with the signature
     * 
     * Constructor for the class gate
     * @param int gateNum - the gate number, 
     * @param boolean arrival - true for arrival and false for departure,
     * @param String fltNum - the flight number of plane using gate
     */
    public Gate(int gateNum, boolean arrival, String fltNum)
    {
        this.gateNum = gateNum;
        this.arrival = arrival;
        this.fltNum = fltNum;
        open = false;
    }

    /**
     * Getter for the gate number.
     * @return The number of the gate
     */
    public int getGateNum()
    {
        return gateNum;
    }

    /**
     * Setter for the gate number.
     * @param aGateNum the gate's number
     */
    public void setGateNum(int aGateNum)
    {
        gateNum = aGateNum;
    }

    /**
     * Getter for the gate arrival status - true if for arrival.
     * @return the arrival / departure status of the gate
     */
    public boolean isArrival()
    {
        return arrival;
    }

    /**
     * Setter for whether gate is for an arrival or for a departure.
     * @param isArrival The arrival/ departure status of the gate
     */
    public void setArrival(boolean isArrival)
    {
        arrival = isArrival;
    }

    /**
     * Getter for the gate's flight number.
     * @return The flight number of the gate
     */
    public String getFltNum()
    {
        return fltNum;
    }

    /**
     * Setter for the gate's flight number.
     * @param aFltNum The flight number for the gate
     */
    public void setFltNum(String aFltNum)
    {
        fltNum = aFltNum;
    }  

    /**
     * Getter for the gate status - open or closed.
     * @return status of the gate
     */
    public boolean isOpen()
    {
        return open;
    }

    /**
     * Setter for open.
     * @param isOpen The gate's open/ closed status
     */
    public void setOpen(boolean isOpen)
    {
        open = isOpen;
    }

    /**
     * Return a String representation of a Gate including
     * its class name, allowing for extension by subclasses.
     * @return the string representation of the gate 
     */
    @Override
    public String toString()
    {
        String outputString = String.format("%s number %d for flight %s",
                getClass().getSimpleName(), gateNum, fltNum);

        if (open) {
            outputString += " is open.";
        }
        else {
            outputString += " is closed.";
        }

        return outputString;
    }  

    /**
     * Question 1 aii) Add an equals method to Gate that overrides the Object class equals method
     * Overriding equals() to compare gate number and flight number
     * 
     *@param Gate object
     *@return true if  Gate objects are the same (gate number and flight number
     *otherwise return false
     */
    @Override
    public boolean equals(Object obj)
    {   
        if (this == obj) {
            return true; // if object is compared with itself then return true
        }
        if (!(obj != null && obj.getClass() == getClass())) { //checks obj is an instance of Gate
            return false;
        }
        Gate other = (Gate) obj; //sets object to compare against
        if (gateNum == other.gateNum && // checks for matching gate numbers and flight number
        fltNum.equals(other.fltNum)) {        
            return true;
        }
        else {
            return false;
        }
    }
    
    /**
     * Question 1 aiii) Add public hashcode method
     * 
     * Adds a hashCode method to Gate using the Objects.hash method, passing to it
     * @param gate number and
     * @param flight number
     * 
     * @return a hashCode
     * 
     */
    
    public int hashCode()
    {
        return Objects.hash(gateNum, fltNum);
    }
    
}

           