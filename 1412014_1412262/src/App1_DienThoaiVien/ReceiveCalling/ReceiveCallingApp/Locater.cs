namespace ReceiveCallingApp
{
    class Locater
    {
        string _phonenumber;
        int _available;
        string _location;
        int _onoff;
        int _key;
        string _type;
        public Locater(string phonenumber, int available, string location, int onoff, int key, string type)
        {
            _phonenumber = phonenumber;
            _available = available;
            _location = location;
            _onoff = onoff;
            _key = key;
            _type = type;
        }

        public string phonenumber { get => _phonenumber; set => _phonenumber = value; }
        public int available { get => _available; set => _available = value; }
        public string location { get => _location; set => _location = value; }
        public int onoff { get => _onoff; set => _onoff = value; }
        public int key { get => _key; set => _key = value; }
        public string type { get => _type; set => _type = value; }
    }
}
