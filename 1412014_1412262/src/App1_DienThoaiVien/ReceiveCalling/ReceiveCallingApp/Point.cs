namespace ReceiveCallingApp
{
    class Point
    {
        string _cusPos;
        string _taxiPos;
        string _driverName;
        int _status;

        public Point(string cusPos,string taxiPos, string driverName, int status)
        {
            _cusPos = cusPos;
            _status = status;
            _taxiPos = taxiPos;
            _driverName = driverName;
        }

        public string cusPos { get => _cusPos; set => _cusPos = value; }
        public int status { get => _status; set => _status = value; }
        public string driverName { get => _driverName; set => _driverName = value; }
        public string taxiPos { get => _taxiPos; set => _taxiPos = value; }
    }
}
