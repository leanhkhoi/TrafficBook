using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ReceiveCallingApp
{
    class Taxi
    {
        string _cusPhonenumber;
        string _driverName;
        float _lat;
        float _lng;
        bool _onoff;
        string _pointKey;
        int _status;
        string _type;
        string _uid;

        public Taxi(string cusPhonenumber, string driverName, float lat, float lng, bool onoff, string pointKey, int status, string type, string uid)
        {
            _cusPhonenumber = cusPhonenumber;
            _driverName = driverName;
            _lat = lat;
            _lng = lng;
            _onoff = onoff;
            _pointKey = pointKey;
            _status = status;
            _type = type;
            _uid = uid;
        }

        public string cusPhonenumber { get => _cusPhonenumber; set => _cusPhonenumber = value; }
        public string driverName { get => _driverName; set => _driverName = value; }
        public float lat { get => _lat; set => _lat = value; }
        public float lng { get => _lng; set => _lng = value; }
        public bool onoff { get => _onoff; set => _onoff = value; }
        public string pointKey { get => _pointKey; set => _pointKey = value; }
        public int status { get => _status; set => _status = value; }
        public string type { get => _type; set => _type = value; }
        public string uid { get => _uid; set => _uid = value; }
    }
}
