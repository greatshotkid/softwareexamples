// Q2 (a) import statements for HashMap, ArrayList and HashSet
import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;
/**
 * Q2 (a)
 * A simple bus route app that allows users to
 * find out what bus numbers include a particular
 * stop on their route, and to print out a complete
 * route for a specified bus route
 * @author (David Shaun Brown)
 * @version (2023.02.28)
 */
public class BusRoutes
{
    // Q2 (b) adding field, routes, which is a HashMap.
    // Key of map will be Integer, representing a bus number.
    // Value is an ArrayList of String objects
    // representing names of places the bus stops on its route.
    public HashMap<Integer, ArrayList<String>> routes;
    // Q2 (b) adding private field of type InputReader;
    private InputReader reader;
 
    {

        // Q2 (c) initialising routes to a new instance of HashMap
        routes = new HashMap<>();
    
        // Q2 (c) initialises reader to a new instance of InputReader
        reader = new InputReader();
    }

    /**
     * Q2 (c) Provided method to populate routes with test data
     */    
    public void populateRoutes()
    {

        ArrayList<String> stops = new ArrayList<>();
        stops.add("High Street");
        stops.add("Acacia Avenue");
        stops.add("Brown Street");
        stops.add("Broadway");
        stops.add("Station");
        routes.put(32, stops);

        ArrayList<String> stops1 = new ArrayList<>();
        stops1.add("High Street");
        stops1.add("Hospital");
        stops1.add("Brown Street");
        stops1.add("School");
        stops1.add("Station");
        routes.put(13, stops1);

        ArrayList<String> stops2 = new ArrayList<>();
        stops2.add("Bank");
        stops2.add("Hospital");
        stops2.add("Brown Street");
        stops2.add("School");
        stops2.add("Terminus");
        routes.put(22, stops2);

    }
    
    public BusRoutes()
    {
        populateRoutes();
    }

    /**
     * Q2 (d) Adding method public void printRoute(int busNum)
     * Prints route for a given bus number
     * @param busNum, an integer for the bus number
     * 
     */
    public void printRoute(int busNum)
    {

        System.out.println("Bus number " + busNum + "route:\n");

        for (String stopsMember  : this.routes.get(busNum))
        {
            System.out.println(stopsMember);
        }

    }

    /**
     * Q2 (e) adding method public void printAllRoutes()
     * Prints routes for all buses
     */
    public void printAllRoutes()
    {
        // Prints out all bus numbers with their stops
        for (Integer routes : this.routes.keySet())
        {
            this.printRoute(routes);
            System.out.println();
        }
    }

    /**
     * Q2 (f) Adding method public HashSet<Integer> getBusesStoppingHere(String aStop)
     * Method returns all buses that stop at the given stop name
     * @param aStop a bus stop to search for
     * @return returns all bus numbers that stop at aStop or empty HashSet if none
     * 
     */
    public HashSet<Integer> getBusesStoppingHere(String aStop)

    {

        // Initialises matches to a new HashMap object
        HashSet<Integer> matches = new HashSet<>();

        for (Integer busNum: this.routes.keySet()){
            if (routes.get(busNum).contains(aStop))
            {
                matches.add(busNum);
            }

        }
        return matches;

    }

    /**
     * Q2 (g) Adding method public HashMap<String, HashSet<Integer>> getStopsAndBusNumbers()
     * Map derived from routes
     * Each stop in routes is a key and the
     * value is a set of bus numbers that stop there
     * 
     * 
     * @param String of stop name
     * @param HashSet<Integer> of bus numbers
     * @return a map derived from routes showing each stop and buses that stop there
     * 
     */
    public HashMap<String, HashSet<Integer>> getStopsAndBusNumbers()
    {
        HashMap<String, HashSet<Integer>> getStopsAndBusNumbers;
        getStopsAndBusNumbers = new HashMap<>();

        for (String aStop: busnum.keySet())  {
            getStopAndBusNumbers.put(aStop, busNum);
            
        }
    }

        /**
         * Q2 (h) Adding method public void accessInfoService()
         * method interacts with user and shows what buses stop and the given stop
         * as inputted by the user
         * 
         */
        public void accessInfoService()
        {
            System.out.println(" \n" + " \n" + "Welcome to the Bus Information Service.\n"
                + "Type where you want to go ->");
            HashSet<String> input = reader.getInput();
            
            if (!matches.isEmpty())
            {
                


        }
    }
}
