
import java.util.HashMap;
import java.util.HashSet;
import java.util.Objects;
/**
 * A Trainer within a training organisation.
 * It is used to keep track of a trainer and how
 * many people they are training.
 * Also shows the county they cover
 * Also tracks the courses the trainer can teach.
 * @author David Shaun Brown
 * @version 2023.05.03
 */
public class Trainer
{
    //Question 3 bi) 
    private String trainerName; //trainers name
    private int numLearners; //no of learners a trainer has
    private String county; //trainers location

    /**
     * Constructor to initialise the fields
     * @param String trainerName - the trainer's full name
     * @param int numLearners- number of learners the trainer has
     * @param String county - geographical county the trainer covers
     */
    public Trainer(String trainerName, int numLearners, String county)
    {
        this.trainerName = trainerName;
        this.numLearners = numLearners;
        this.county = county;
    }


    /**
     * Getter for the county covered
     * @return the county covered
     */
    public String getCounty()
    {
        return county;
    }

    /**
     * Setter for the county covered
     * @param aCounty - the name of the county covered
     */
    public void setCounty(String aCounty)
    {
        county = aCounty;
    }

    /**
     * Getter for the trainers name
     * @return the trainer's name
     */
    public String getTrainerName()
    {
        return trainerName;
    }

    /**
     * Setter for the trainers name
     * @param aTrainerName - the name of the trainer
     */
    public void setTrainerName(String aTrainerName)
    {
        trainerName = aTrainerName;
    }

    /**
     * Getter for the number of learners
     * @return the number of learners
     */
    public int getNumLearners()
    {
        return numLearners;
    }

    /** 
     * Setter for the number of learners
     * @param aNumLearners the number of learners the trainer has
     */
    public void setNumLearners(int aNumLearners)
    {
        numLearners = aNumLearners;
    }

    /**
     * Question 3 part bii)
     * returns a string representation of the trainer's name
     * @return the string representation of the trainer's name
     */
    public String toString()
    { 
        String outputString = String.format("%s has %d learners covering %s", 
                trainerName, numLearners, county);

        return outputString;
    }

    /**
     * Overriding  the Object class equals method to check if trainers with the
     * same name are infact the same person
     *
     *@param Trainer object
     *@return true if theay are the same person (name, learners and county)
     *otherwise false if they are different trainers
     */
    @Override
    public boolean equals(Object obj)
    {
        if(this == obj) {
            return true; // if object is compared to itself then return true
        }
        if (!(obj !=null && obj.getClass() == getClass())) {
            //checks obj is an instance of Trfainer
            return false;
        }
        Trainer other = (Trainer) obj; //sets object to compare against
        if (trainerName.equals(other.trainerName) &&
        numLearners == other.numLearners &&
        county.equals(other.county)) {
            return true;
        }
        else {
            return false;
        }
    }

    /**
     * Adds a hascode to Trainer using the Objects.has method
     * passing to it
     * @param trainer name
     * @param number of learners
     * @param county
     * 
     * @return a hashcode
     */
    public int hashCode()
    {
        return Objects.hash(trainerName, numLearners, county);
    }

}
