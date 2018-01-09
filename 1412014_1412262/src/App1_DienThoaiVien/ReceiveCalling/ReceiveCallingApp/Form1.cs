using System;
using System.Collections.Generic;

using System.Windows.Forms;
using FireSharp.Interfaces;
using FireSharp.Config;
using FireSharp;
using FireSharp.Response;
using FireSharp.Extensions;
using Newtonsoft.Json.Linq;
using GoogleDirections;

namespace ReceiveCallingApp
{
    public partial class Form1 : Form
    {
        IFirebaseConfig config;
        IFirebaseClient client;
        object obj = null;

        bool verifyCb = false; //duoc gui cho app2
        public Form1()
        {
            InitializeComponent();
        }

        private async void Form1_LoadAsync(object sender, EventArgs e)
        {
            config = new FirebaseConfig
            {
                AuthSecret = "aEAl0mjXoKiSwDLSzMxgc1UDitCQevwyANP5hk8C",
                BasePath = "https://trafficbookapp.firebaseio.com"
            };

            client = new FirebaseClient(config);
            EventStreamResponse response = await client.OnAsync("todos/set"
            //added
            , (_sender, args,contex) => {
               
                Console.WriteLine(args.ToJson());
             //changed (update)
            }, (_sender, args, contex) => {
                
                Console.WriteLine(args.ToJson());
            //removed
            }, (_sender, args, contex) => {
                
                Console.WriteLine(args.ToJson());
            },obj);

            //Call dispose to stop listening for events
          

        }


        private void SubmitGuest_Click(object sender, EventArgs e)
        {
            if (verifyCb == true)
            {
                MessageBox.Show("Dia chi duoc chon lai phai gui cho app 3");
                return; //chi 
            }
            //validate
            if (!ValidateInput()) return;


            //gui diem cho app dinh vi
            //tim app mà dịch vụ định vị đang rãnh


            //them vao lich su location
            int index = AddHistoryLocation();

            //gui toi ban cap nhat
            if (!SendToLocateApp(index)) return;


            
          
          
            /*Location[] loc = new Location[1];
            loc[0] = new Location("Linh Xuan, quan Thu Duc", 1);

            var phonecall = new Phonecall
            {
                locations = loc,
                type = "premium"
            };
            SetResponse response = client.Set("path", phonecall);
            Phonecall result = response.ResultAs<Phonecall>();*/

            //push data
            /* Dictionary<int, string> locations = new Dictionary<int, string>();
             locations.Add(1, "Hiệp Bình Chánh, quận Thủ Đức");
             PushResponse response = client.Push("Phonecalls/123456778",locations );*/
            //Phonecall result = response.ResultAs<Phonecall>();


            //retrive data
            /*FirebaseResponse response = client.Get("Phonecalls/0927574546");
            Phonecall phonecall = response.ResultAs<Phonecall>(); //The response will contain the data being retreived
            MessageBox.Show(phonecall.locations.ToJson());*/
            /*MySqlConnection conn = DBUtils.GetDBConnection();
            try
            {
                //MessageBox.Show("Openning Connection ...");
                conn.Open();
                string phonenumber = phonenumberText.Text;
                string location = locationText.Text;
                bool type = originRBtn.Checked ? false : true;
                List<String> rs = MySQLQuery.InsertCallPhone(phonenumber, location, type, conn);
                //MessageBox.Show("Connection successful!");
                phonenumberText.Text = rs[1];

            }
            catch (Exception ex)
            {
                MessageBox.Show("Error: " + ex.Message);
            }
            finally
            {
                MessageBox.Show("close!");
                // Close connection.
                conn.Close();
                // Dispose object, Freeing Resources.
                conn.Dispose();
            }*/


        }

        private int AddHistoryLocation()
        {
            string path = "Phonecalls/" + phonenumberText.Text;
            FirebaseResponse response = client.Get(path);
            Phonecall phonecall = response.ResultAs<Phonecall>(); //The response will contain the data being retreived

            //neu day la lan dien thoai dau tien cua khach
            if (phonecall == null)
            {
                Location[] locs = new Location[1];
                if(originRBtn.Checked)
                locs[0] = new Location(locationCb.Text, 3, "origin");
                else locs[0] = new Location(locationCb.Text, 3, "premium");
                phonecall = new Phonecall
                {
                    locations = locs
                };
                response = client.Set(path, phonecall);
                Phonecall result = response.ResultAs<Phonecall>();
                return 0;
            }
            //neu khach da goi truoc do nhung nhap vao 1 dia chi moi
            else
            {
                int length = 0;
                List<Location> ls = new List<Location>();
                length = phonecall.locations.Length;
                for (int i = 0; i < phonecall.locations.Length; i++)
                {
                    ls.Add(phonecall.locations[i]);
                }
                 if(originRBtn.Checked)
                    ls.Add(new Location(locationCb.Text, 3, "origin"));
                else ls.Add(new Location(locationCb.Text, 3, "premium"));

                Location[] locs = ls.ToArray();

                phonecall = new Phonecall
                {
                    locations = locs
                };
                response = client.Set(path, phonecall);
                Phonecall result = response.ResultAs<Phonecall>();
                return length;
            }


        }

        private bool SendToLocateApp(int index)
        {
            string path = "LocatedApp";

            //lay locaters cua locatedApp
            FirebaseResponse response = client.Get(path);

            LocaterApp locterapp = response.ResultAs<LocaterApp>();
            for (int i = 0; i < locterapp.locaters.Length; i++)
            {
                //neu may dinh vi dang bat va dang ranh
                if (locterapp.locaters[i].onoff==1 && locterapp.locaters[i].available == 1)
                {
                    // neu dinh vi vien dang khong lam viec thi add dia chi vao (update)
                    locterapp.locaters[i].available = 0;
                    locterapp.locaters[i].phonenumber = phonenumberText.Text;
                    locterapp.locaters[i].location = locationCb.Text;
                    locterapp.locaters[i].key = index;
                    if (originRBtn.Checked) locterapp.locaters[i].type = "origin";
                    else locterapp.locaters[i].type = "premium";
                    response = client.Update(path, locterapp);
                    break;
                }
                if (i == locterapp.locaters.Length - 1)
                {
                    MessageBox.Show("hien tai app dinh vi dang full");
                    return false ;
                }
            }
            return true;
        }

        private bool ValidateInput()
        {
            if (phonenumberText.Text == "")
            {
                MessageBox.Show("Enter phone number");
                return false;
            }
            if (locationCb.Text == "")
            {
                MessageBox.Show("Enter location");
                return false;
            }
            return true;
        }

        private void locationCb_DropDown(object sender, EventArgs e)
        {
            verifyCb = true;
            try
            {
                //lay data va chinh sua noi dung data
                string path = "Phonecalls/" + phonenumberText.Text;
                FirebaseResponse response = client.Get(path);
                Phonecall phonecall = response.ResultAs<Phonecall>(); //The response will contain the data being retreived
                Location[] locs = phonecall.locations;
                for(int i = 0; i < locs.Length; i++)
                {
                  
                    if (locs[i].status == 1)
                    {
                        locs[i].detail = locs[i].detail + " (confirmed)";
                    }
                    else if (locs[i].status == 2)
                    {
                        locs[i].detail = locs[i].detail + " (not found motor)";
                    }
                    else if (locs[i].status == 3)
                    {
                        locs[i].detail = locs[i].detail + " (not located)";
                    }
                }
               
                //binding len combobox
                bindingSource1.DataSource = locs;
                locationCb.DataSource = bindingSource1.DataSource;
                locationCb.DisplayMember = "detail";
                locationCb.ValueMember = "status";
            }
            catch
            {
                MessageBox.Show("nothing");
                locationCb.DataSource = null;
                locationCb.Items.Clear();
            }
        }
        private void locationCb_SelectedIndexChanged(object sender, EventArgs e)
        {
            verifyCb = true;
            //MessageBox.Show(comboBox1.Text);
            //MessageBox.Show("textchanged 2");


        }

        private void phonenumberText_TextChanged(object sender, EventArgs e)
        {
            try
            {
                if (phonenumberText.Text =="" || (int.Parse(phonenumberText.Text) > 0))
                {
                    //MessageBox.Show("Valid");
                   
                    //MessageBox.Show(phonecall.locations.ToJson());
                }
            }
            catch
            {
                //MessageBox.Show("Format is invalid");
                phonenumberText.Text = "";
            }
        }
        private void locationCb_TextChanged(object sender, EventArgs e)
        {

            verifyCb = false;
           // MessageBox.Show("textchanged");
        }

        private void bindingSource1_CurrentChanged(object sender, EventArgs e)
        {

        }
         private bool SendToInspectorApp()
         {
            FirebaseResponse response;
            string path1 = "Taxis";
            string path2 = "Points";

            //tim taxi de gui
            //random 1 so tu 0 -> 99
            //
            Taxi selectedTaxi = null;
            string selectedTaxiKey = null;
            Dictionary<string, Taxi> taxis = new Dictionary<string, Taxi>();
            response = client.Get(path1);
            taxis = response.ResultAs<Dictionary<string, Taxi>>();
            if (taxis.Count == 0)
            {
                MessageBox.Show("load taxis failed, null");
                return false;
            }
            else
            {
                foreach (var taxi in taxis)
                {
                    Taxi tx = taxi.Value;
                    string txkey = taxi.Key;
                    if (tx.status == 0)
                    {
                        selectedTaxiKey = txkey;
                        selectedTaxi = tx;
                        MessageBox.Show("taxis have " + taxis.Count + ". this is " + tx.driverName + " with key = " + txkey);
                        break;
                    }
                }
               // return true;
            }

            //lay locaters cua locatedApp
            string addressString = "";
            Geocoder geocoder = new Geocoder("AIzaSyD8aZnYa2rBuQaA_asqmH65T5FbqMq2Pyc");
            if(selectedTaxi != null)
            {
                addressString = geocoder.ReverseGeocode(new LatLng(selectedTaxi.lat, selectedTaxi.lng));
            }
            else
            {
                MessageBox.Show("Taxi is null");
                return false;
            }
           
            if(addressString=="")
            {
                MessageBox.Show("geocoder dia chi that bai");
                return false;
            }

            Point p = new Point(locationCb.Text.Split('(')[0], addressString, selectedTaxi.driverName, 2);

            //*******
            response = client.Push(path2, p); //them Point vao database ,(khong qua app 2) 
            //*******

            object rs = response.ResultAs<object>();
            if (rs == null) return false;
            JObject o = JObject.Parse(rs.ToString());
            string pointKey = (string)o.SelectToken("name");//lay pointKey

            selectedTaxi.cusPhonenumber = phonenumberText.Text;
            selectedTaxi.pointKey = pointKey;
            selectedTaxi.status = 3; //dang cho phan hoi
            if (originRBtn.Checked)
                selectedTaxi.type = "origin";
            else selectedTaxi.type = "premium";

            string path3 = "Taxis/" + selectedTaxiKey;
            response = client.Update(path3, selectedTaxi);

            //MessageBox.Show(rs.ToString() + "\n" +key);
            //MessageBox.Show(addressString);
            return true;
        }

        //gui toi app 3
        private void button1_Click(object sender, EventArgs e)
        {
            if(verifyCb == false)
            {
                MessageBox.Show("Go dia chi moi thi phai gui cho app 2");
                return;
            }
            //
            if (!ValidateInput()) return;
            if (!SendToInspectorApp()) return;
            verifyCb = false;
            phonenumberText.Text = "";
            locationCb.Text = "";

        }

        private void originRBtn_CheckedChanged(object sender, EventArgs e)
        {

        }
    }
}
