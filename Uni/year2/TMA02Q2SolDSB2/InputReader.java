import java.util.Scanner;

/**
 * InputReader reads text input from the Terminal window.
 * 
 * @author M250 Module Team
 * @version 13 Sept 2021
 */
public class InputReader
{
    private Scanner reader;

    /**
     * Create a new InputReader that reads text from the Terminal window.
     */
    public InputReader()
    {
        reader = new Scanner(System.in);
    }

    /**
     * Read a line of text from standard input (the text terminal),
     * and return it as a String.
     *
     * @return  A String typed by the user. 
     */
    public String getInput() 
    {     
      String word = reader.nextLine();
      return word;                    
    }
}