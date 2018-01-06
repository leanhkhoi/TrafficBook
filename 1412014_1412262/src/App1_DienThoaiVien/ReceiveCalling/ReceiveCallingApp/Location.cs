namespace ReceiveCallingApp
{
    public class Location
    {
        string _detail;
        int _status;
        string _type;

        public Location(string detail, int status, string type)
        {
            this._detail = detail;
            this._status = status;
            this._type = type;
        }

        public string detail { get => _detail; set => _detail = value; }
        public int status { get => _status; set => _status = value; }
        public string type { get => _type; set => _type = value; }
    }
}