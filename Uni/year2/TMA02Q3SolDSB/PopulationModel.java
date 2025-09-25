
/**
 * Q3 (a) adding new class PopulationModel and edited to include
 * name, date and description of class
 * 
 * The PopulationModel class models two colonies of animals that
 * predate on each other and shows the resultant population of each
 * colony for a set number of weeks
 *
 * @author (David Shaun Brown)
 * @version (2023.03.01)
 */
public class PopulationModel
{
    // Q3 (b) Adding fields numA and numB, both are int arrays
    public int[] numA;
    public int[] numB;

    // Q3 (b) adding private class constants
    private static final int INITIALA = 50; //size of colony A
    private static final int INITIALB = 60; //size of colony B
    private static final double KILL_RATEA = 0.2; //colony A kill rate of colony B
    private static final double KILL_RATEB = 0.1; //colony B kill rate of colony A
    private static final int NUM_WEEKS = 10; //number of weeks for model

    /**
     * Q3 (c) adding public constructor to initialise numA and NumB to 
     * be int arrays of length NUM_WEEKS.
     * 
     * 
     */
    public PopulationModel()
    {
        numA = new int[NUM_WEEKS];
        numB = new int[NUM_WEEKS];

        //Element at index 0 of numA initialised to INITIALA.
        numA[0] = INITIALA;
        //Element at index 0 of numB initialised to INITIALB.
        numB[0] = INITIALB;

    }

    /** 
     * Q3 (d)
     * Write a method with the header public int newNumA(int currentA, int currentB)
     * 
     * This method calculates the number of animals left in colony A
     * in the given week, based on the numbers in the two colonies in
     * the previous week.
     * This number is given by expression: currentA-KILL_RATEB*currentB
     * 
     * @param int currentA is population of A from previous week
     * @param int currentB is population of B from previous week
     * @param double aDouble is result of expression above, used as in put to return an int
     * @return returns number of animals in colony A > 0 and 0 otherwise
     */
    public int newNumA(int currentA, int currentB)
    {
        // calculates new value for population of colony A
        // and converts the value from a double to an integer
        int newNumA = (int) Math.floor(currentA-KILL_RATEB*currentB);

        // if newNumA > 0, then the number is returned
        if (newNumA > 0) {
            return newNumA;
        }
        // otherwise 0 is returned (no population)   
        else {
            return 0;
        }

    }

    /** 
     * Q3 (e)
     * Write a method with the header public int newNumB(int currentA, int currentB)
     * 
     * This method calculates the number of animals left in colony B
     * in the given week, based on the numbers in the two colonies in
     * the previous week.
     * This number is given by expression: currentB-KILL_RATEA*currentA
     * 
     * @param int currentA is population of A from previous week
     * @param int currentB is population of B from previous week
     * @param double aDouble is result of expression above, used as in put to return an int
     * @return returns number of animals in colony A > 0 and 0 otherwise
     */
    public int newNumB(int currentA, int currentB)
    {
        // calculates new value for population of colony A
        // and converts the value from a double to an integer
        int newNumB = (int) Math.floor(currentB-KILL_RATEA*currentA);

        // if newNumB > 0, then the number is returned
        if (newNumB > 0) {
            return newNumB;
        }
        // otherwise 0 is returned (no population)   
        else {
            return 0;
        }

    }

    /**
     * Q3 (f) Write a method with the header public void storeNewPopulations(int thisWeek)
     * 
     * This method uses values from newNumA and newNumB to find populations
     * of colony A and colony B for next week based on the index thisWeek.
     * 
     * New populations are stored in appropriate indexes of newA and newB arrays
     * 
     * @param int thisWeek used to calculate next weeks populations
     */
    public void storeNewPopulations(int thisWeek)
    {

        numA[thisWeek+1] = newNumA(numA[thisWeek], numB[thisWeek]);

        numB[thisWeek+1] = newNumB(numA[thisWeek], numB[thisWeek]);
    }

    /**
     * Q3 (g) Write a method with the header public void createData()
     * 
     * This method uses a loop to call storeNewPopulations method
     * with each of the possible array indexes in turn as a parameter
     * except for the last array index
     */
    public void createData()
    {
        for (int i = 0; i < NUM_WEEKS-1; i++)
        {
            storeNewPopulations(i);
        }

    }

    /**
     * Q3 (h) Write a public method printBarChart
     * 
     * This method has no parameters and does not return a value,
     * which returns a bar chart of the population of colony A 
     * and colony B
     */
    public void printBarChart()
    {
        for (int i = 0; i<=NUM_WEEKS; i++)
        {
            int a = numA[i];
            int b = numB[i];

            for (int j = 0; j<=a; j++)
            {
                System.out.print("Week " + j + "A:" + "*" + "(" + a + ")\n");
                for (int k = 0; k<=b; k++)
                {
                    System.out.print("Week " + k + "B;" + "*" + "(" + b + ")\n");
                }

            }
        }
    }
}
