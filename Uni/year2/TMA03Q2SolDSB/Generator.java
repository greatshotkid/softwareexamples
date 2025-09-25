/**
 * Abstract class Generator simulates power generators 
 * and provides methods to implement PowerPlant.
 *
 * @author David Shaun Brown
 * @version 2023.05.02
 * 
 * Question 2 bi) Modify header to implement  PowerPlant interface
 */
public abstract class Generator implements PowerPlant
{        
    private String name;    // Name of the generator
    private String kind;    // Kind of the generator
    private boolean operating;  // true if the currently generating power
    private int generatorStore; // Energy stored in kWattHrs

    /**
     * Creates a new generator
     * 
     * @param name The name of the generator
     * @param kind The kind of generator
     */
    public Generator(String name, String kind)
    {
        this.name = name; //sets name field
        this.kind = kind; //sets kind field
        operating = false; //sets operating to false
        generatorStore = 0; //sets generatorStore to 0
    }

    /**
     * Flips the value of operating from true to false
     * or vice versa.
     */
    public void flipOperating()
    {
        operating = !operating;
    }

    /**
     * Getter method for operating.
     * @return true if operating, otherwise false.
     */
    public boolean isOperating()
    {
        return operating;
    }

    /**
     * Produce a String representation of a Generator.
     * @return a String representation of the receiver.
     */
    public String toString()
    {
        return "name: " + name + " kind:  " + kind  + " generator store: "
        + generatorStore + " is operating: " + operating;
    }   

    /**
     * Pause execution for a specified number of milliseconds.
     * @param millis The number of milliseconds to pause execution by
     */
    public void pause(int millis)
    {
        try {
            Thread.sleep(millis);
        }
        catch(Exception e)  {
            System.err.println("There was a problem pausing execution");
        }
    }

    /**
     * Question 2 bii) Write a method with header public boolean generate(int numTimes, int numKWh)
     * 
     * This method simulates the generation of electricity if generator is operating
     * 
     *@param numTimes The number of times a generator rotates
     *@param numKWh The amount of kWh added to generatorStore
     *
     *@return true if generator is operating, false if it isn't
     */
    public boolean generate(int numTimes, int numKWh)
    {
        if (operating == true) {

            for (int i = 0; i < numTimes ; i++) { //sets a counter to 0 and loops until counter is equal to numTimes
                generatorStore = generatorStore + numKWh; //adds numKWh to generator store
                pause(100); //slows down the action 100 milliseconds for each step.
            }
            return true;
        }
        else {
            return false;
        }
    }

    /**
     * Question 2 biii) implement public toGrid method
     * 
     * This method takes the energy to be transferred to the grid and tells us how much was
     * actually transfered and should never be more than the generator has available
     * 
     * @param kWh - total energy to be transferred to the grid
     * 
     * @return actual energy transfered
     */
    public int toGrid(int totKWh)
    {
        int kWhOut= totKWh; //variable to hild how many kWh are transfered out
        int availableEnergy = generatorStore - totKWh; //calculates available energy for tansfer

        if (availableEnergy >= 0) { //checks available energy is > 0
            generatorStore = generatorStore - kWhOut; //deducts energy transferred form generator store
            return kWhOut;
        }
        else {
            kWhOut = generatorStore; //calculates how much energy can be transferred
            generatorStore = 0; //calculates energy left in energy store
            return kWhOut;
        }
    }

    /**
     * Question 2 biv) implement a public method with signature fromGrid()
     * 
     * This method increases generator store by supplied amount
     * 
     * @param kWhIn - kWh added to generator store
     */
    public void fromGrid(int kWhIn)
    {
        generatorStore = generatorStore + kWhIn;
    }              
}