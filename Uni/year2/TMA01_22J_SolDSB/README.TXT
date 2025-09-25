Use the following method in Question 2 part (d)

	/**
     * (d) Adds some unoccupied test rooms to the hotel
	 */
    public void addRooms()
    {
        int i = 10;
        while (i < 19) {
            String number = "" + i;
            double rate;

            if(i % 3 == 1) {
                number += "A";
                rate = 100;
            }
            else if (i % 3 == 2) {
                number += "B";
                rate = 180;
            }
            else
            {
                number += "C";
                rate = 250;
            }

            Room r = new Room("", number, rate);

            rooms.add(r);
            i++;
        }
    }
