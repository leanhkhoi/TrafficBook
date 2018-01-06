namespace ReceiveCallingApp
{
    class Point
    {
        string _cusPos;
        int _status;

        public Point(string cusPos, int status)
        {
            _cusPos = cusPos;
            _status = status;
        }

        public string cusPos { get => _cusPos; set => _cusPos = value; }
        public int status { get => _status; set => _status = value; }
    }
}
