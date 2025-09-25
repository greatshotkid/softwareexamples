/**
 * Class WindTurbine simulates a type of power generator.
 *
 * @author David Shaun Brown
 * @version 2023.05.03
 * 
 * Qustion 2 ci) modify the header
 **/
public class WindTurbine extends Generator
{   
    private boolean windy;
    /**
     * Constructor for the subclass Windturbine
     * 
     * @param aName - name of the field
     */
    public WindTurbine(String aName)
    {
        super(aName, "Wind Turbine");
        windy = false;
    }

    /**
     * Question cii) Override the flipOperating method
     * 
     * Flips the value of operating from true to false
     * or vice versa
     * depending if windy is true or false
     */
    @Override
    public void flipOperating()
    {
        
        boolean newValue = false;
        if (windy && isOperating()) {
            newValue = false;
        }
        if (windy && !(isOperating())) {
            newValue = true;
        }
        if (!windy && isOperating()) {
            newValue = false;
        }
        if (!windy && !(isOperating())) {
            newValue = false;
        }
    }

    
        /**
         * Getter method for windy.
         * @return true if windy, otherwise false.
         */
        public boolean isWindy()
        {
            return windy;
        }

        /**
         * Setter for windy that can also change operating status.
         * @param isWindy The boolean value to set windy 
         */
        public void setWindy(boolean isWindy)
        {
        windy = isWindy;

        if (!windy && isOperating())
        {
            flipOperating();
        }
    }
}
