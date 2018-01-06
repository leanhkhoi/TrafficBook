namespace ReceiveCallingApp
{
    class Phonecall
    {

        Location[] _locations;
        public Phonecall()
        {
        }

        public Phonecall(Location[] locations)
        {
            this._locations = locations;
         
        }

        public Location[] locations { get => _locations; set => _locations = value; }
       
    }
}
