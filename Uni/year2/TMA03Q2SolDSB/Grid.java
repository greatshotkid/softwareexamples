import java.util.*;

/**
 * Class Grid simulates an electricity grid connected 
 * to power generators of various types.
 *
 * @author David Shaun Brown
 * @version 2023.05.04
 */
public class Grid
{
    //energy stored by Grid in kWh
    private int gridStore;
    // Question 2 di) add and instance variable
    public ArrayList<Generator> generators; //creates instance variable ArrayList<Generator> generators
    /**
     * Constructor for objects of class Grid.
     */
    public Grid()
    {       
        gridStore = 0;
        generators = new ArrayList<Generator>(); //initialises an empty ArrayList
    }   

    /**
     * Question 2 dii)
     * This method transfers energy form gridStore to the specified generator
     * 
     * @param Generator -generator to transfer energy to
     * @param kWhOut - how much energy to transfer to generator
     * 
     * @return message displayed if insufficient energy in grid store 
     */
    public void grid2Generator(Generator name, int kWhOut)
    {
        int kWattHrs = kWhOut;

        for (Generator generators : generators) {
            if(gridStore >= kWattHrs) {

                gridStore = gridStore - kWattHrs;

            }
            else {
                System.out.println("Only " + gridStore + " kWh available: cannot transfer " + kWattHrs + " to generator");
            }
        }
    }

    /**
     * Question 2 diii) add a toString method...
     * 
     * This method returns information that tells us which generators are operating
     * 
     * @return String telling us which generators are operating
     */

    public String toString()
    {
        
        String outputString = "Generators currently operating are:  \n";
       
        for (Generator generators : generators) {
            if (generators.isOperating() == true) {
            outputString = outputString + generators.toString()  + " \n";

            
        }
        
    }
    return outputString;
}

    /**
     * Displays the String representation of the grid
     */
    public void display()
    {
        System.out.print(this);
        System.out.println("Energy in grid store: " + gridStore);
    }

    /**
     * @param aGenerator The generator to be added to the list of generators
     */
    public void addGenerator(Generator aGenerator)
    {
        generators.add(aGenerator);
    }

    /**
     * Attempts to increases the gridStore 
     * and reduces the store of the generator by the
     * same amount up to the amount available
     * 
     * @param g The generator to receive energy from
     * @param kWattHrs The amount of energy to receive if available
     */
    public void generator2Grid(Generator g, int kWattHrs)      
    {
        gridStore = gridStore + g.toGrid(kWattHrs);
    }

}
