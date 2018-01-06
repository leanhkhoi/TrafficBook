namespace ReceiveCallingApp
{
    class LocaterApp
    {
        Locater[] _locaters;

        public LocaterApp(Locater[] locaters)
        {
            _locaters = locaters;
        }

        public Locater[] locaters { get => _locaters; set => _locaters = value; }
    }
}
