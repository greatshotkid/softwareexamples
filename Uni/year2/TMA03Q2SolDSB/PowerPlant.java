
/**
 * Question 2 part ai and aii
 * 
 * PowerPlant interface
 * Classes implementing this interface are able to change 
 * their operating status
 * 
 *The toGrid method allows us to specify how much energy
 *is going into the grid
 *
 *The fromGrid method allows us to specify how much energy
 *is coming from the grid
 * @author David Shaun Brown
 * @version 2023.05.02
 */
public interface PowerPlant
{
    void flipOperating();

    int toGrid(int kWh);

    void fromGrid(int kWh);
}
