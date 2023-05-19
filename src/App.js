import './App.css';
import { useEffect, useState } from 'react';
import GaugeChart from 'react-gauge-chart'
import { getDatabase, off, onValue, ref } from 'firebase/database';
import { initializeApp } from "firebase/app";


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBEMnYmhxlqa5pOV4nuR8ThVDR-Q5w_6gg",
  authDomain: "ho-tom-588a4.firebaseapp.com",
  databaseURL: "https://ho-tom-588a4-default-rtdb.firebaseio.com",
  projectId: "ho-tom-588a4",
  storageBucket: "ho-tom-588a4.appspot.com",
  messagingSenderId: "734198972880",
  appId: "1:734198972880:web:a055b6b66dd95431e1f9d5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

function App() {
  const [nhietdo, setNhietdo] = useState(0);
  const [khoangcach, setKhoangcach] = useState(0);
  const [oxy, setOxy] = useState(0);
  useEffect(() => {
    const dbRef = ref(database, "/All");
    onValue(dbRef, (snapshot) => {
      const data = snapshot.val();
      setNhietdo(data.thanhphan.Nhietdo);
      setKhoangcach(data.thanhphan.khoangcach);
      setOxy(data.thanhphan.oxy)
    });
    return () => {
      off(dbRef);
    };
  }, []);

  const [thucong, setThuCong] = useState(false);
  const handleCLickTuDong = () => {
    setThuCong(false);
  }
  const handleCLickThuCong = () => {
    setThuCong(true);
  }
  const ph = 7;

  return (
    <div className="App">
      {/* cảnh báo khẩn cấp */}
      <div className="urgent">
      </div>
      {/* -- end cảnh báo khẩn cấp-- */}
      <div className='header'>
        <div className="logo"><img className="logo" src="/logo.jpeg" alt="" /></div>
        <div className="title"><h1>HỆ THỐNG GIÁM SÁT HỒ NUÔI TÔM SỬ DỤNG IOT</h1></div>
        <div className="logo"><img className="logo" src="/logo2.jpg" alt="" /></div>
      </div>
      <div className="body">
        <div className="sidebar">
          <h2 className='title-sidebar'>Bảng điều khiển</h2>
          <div className="survivalmode">
            <h2>Chế độ</h2>
            <button className="learn-more" onClick={() => { handleCLickTuDong() }}> Tự đông
            </button>
            <button className="learn-more" onClick={() => { handleCLickThuCong() }}> Thủ công
            </button>
          </div>
          {!thucong &&
            <h3 className="message">Hệ thống hiện đang ở chế độ tự động...</h3>}
          {thucong &&
            <div className='action-grounp'>

              <div className="action">
                <h2>Máy bơm 1:</h2>
                <label className="button" for="toggle">
                  <input id="toggle" type="checkbox" />
                  <span className="slider"></span>
                </label>
              </div>
              <div className="action">
                <h2>Máy bơm 2:</h2>
                <label className="button" for="toggle1">
                  <input id="toggle1" type="checkbox" />
                  <span className="slider"></span>
                </label>
              </div>
              <div className="action">
                <h2>Máy bơm 3:</h2>
                <label className="button" for="toggle2">
                  <input id="toggle2" type="checkbox" />
                  <span className="slider"></span>
                </label>
              </div>
              <div className="action">
                <h2>Máy bơm 4:</h2>
                <label className="button" for="toggle3">
                  <input id="toggle3" type="checkbox" />
                  <span className="slider"></span>
                </label>
              </div>
            </div>
          }
        </div>
        <div className="content">
          <h2 className='title-content'>Bảng thông số</h2>
          {/* ph */}
          <div className='thongso'>
            <GaugeChart id="gauge-chart2"
              nrOfLevels={15}
              percent={ph / 14}
              // textColor="red"
              needleColor="#BEBEBE"
              // hideText
              formatTextValue={() => ph}
            />
            <h2 className='title-thongso'>ĐỘ PH</h2>
          </div>

          <div className='thongso'>

            <GaugeChart id="gauge-chart3"

              percent={nhietdo / 100}
              formatTextValue={(value) => nhietdo}
            />
            <h2 className='title-thongso'>NHIỆT ĐỘ (<sup> &#176;</sup>C)</h2>
          </div>
          <div className='thongso'>

            <GaugeChart id="gauge-chart5"
              nrOfLevels={30}
              arcsLength={[0.3, 0.5, 0.2]}
              colors={['#EA4228', '#F5CD19', '#5BE12C']}
              percent={oxy / 10}
              formatTextValue={() => oxy}
            />
            <h2 className='title-thongso'>ĐỘ OXY (<span> ml/L</span>)</h2>

          </div>
          <div className='thongso'>

            <GaugeChart id="gauge-chart5"
              nrOfLevels={420}
              arcsLength={[0.4, 0.4, 0.2]}
              colors={['#EA4228', '#F5CD19', '#5BE12C']}
              percent={khoangcach / 300}
              arcPadding={0.02}
              formatTextValue={() => khoangcach}
            />
            <h2 className='title-thongso'>MỨC NƯỚC (<span> cm</span>)</h2>

          </div>
        </div>
      </div>

    </div>
  );
}

export default App;
