import './App.css';
import { useEffect, useState } from 'react';
import GaugeChart from 'react-gauge-chart'
import { getDatabase, off, onValue, ref, set } from 'firebase/database';
import { initializeApp } from "firebase/app";

//mode
// 0 là thử công
// 1 là tự động

// Derive
// 0 là off
// 1 là on

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBEMnYmhxlqa5pOV4nuR8ThVDR-Q5w_6gg",
  authDomain: "ho-tom-588a4.firebaseapp.com",
  databaseURL: "https://ho-tom-588a4-default-rtdb.firebaseio.com",
  projectId: "ho-tom-588a4",
  storageBucket: "ho-tom-588a4.appspot.com",
  messagingSenderId: "734198972880",
  appId: "1:734198972880:web:653bd0d103255429e1f9d5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

function App() {
  const [nhietdo, setNhietdo] = useState(0);
  const [khoangcach, setKhoangcach] = useState(0);
  const [oxy, setOxy] = useState(0);
  const [ph, setPh] = useState(0);
  const [shouldRotate, setShouldRotate] = useState(true);
  const [thucong, setThuCong] = useState(0);
  // thiết bị
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [device1, setDevice1] = useState(0);
  const [device2, setDevice2] = useState(0);
  const [device3, setDevice3] = useState(0);
  const [device4, setDevice4] = useState(0);
  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
    };

    const handleOffline = () => {
      setIsOnline(false);
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  useEffect(() => {
    const dbRef = ref(database, "/SmartHub");
    onValue(dbRef, (snapshot) => {
      const data = snapshot.val();
      const mode = data.Mode;
      setThuCong(mode)
      if (mode === 2) {
        const deviceCurent = 0;
        set(ref(database, '/SmartHub/Device1'), deviceCurent)
          .then(() => {
            console.log('Giá trị Device1 đã được cập nhật thành ' + deviceCurent);
          })
          .catch((error) => {
            console.error('Lỗi khi cập nhật giá trị Device:', error);
          });
        set(ref(database, '/SmartHub/Device2'), deviceCurent)
          .then(() => {
            console.log('Giá trị Device2 đã được cập nhật thành ' + deviceCurent);
          })
          .catch((error) => {
            console.error('Lỗi khi cập nhật giá trị Device:', error);
          });
        set(ref(database, '/SmartHub/Device3'), deviceCurent)
          .then(() => {
            console.log('Giá trị Device3 đã được cập nhật thành ' + deviceCurent);
          })
          .catch((error) => {
            console.error('Lỗi khi cập nhật giá trị Device:', error);
          });
        set(ref(database, '/SmartHub/Device4'), deviceCurent)
          .then(() => {
            console.log('Giá trị Device4 đã được cập nhật thành ' + deviceCurent);
          })
          .catch((error) => {
            console.error('Lỗi khi cập nhật giá trị Device:', error);
          });
        setDevice1(deviceCurent)
        setDevice2(deviceCurent)
        setDevice3(deviceCurent)
        setDevice4(deviceCurent)
      }
      else {
        setNhietdo(data.Temperature);
        setKhoangcach(data.Height);
        setOxy(data.TDS);
        setPh(data.PH);
        if (mode === 0) {
          setDevice1(data.Device1);
          setDevice2(data.Device2);
          setDevice3(data.Device3);
          setDevice4(data.Device4);
        }
      }

    });
    return () => {
      off(dbRef);
    };
  }, []);

  setTimeout(() => {
    setShouldRotate(false); // Ngăn không cho kim xoay
  }, 3000);

  const handleCLickTuDong = () => {
    set(ref(database, '/SmartHub/Mode'), 1)
      .then(() => {
        console.log('Giá trị Mode đã được cập nhật thành 1');
      })
      .catch((error) => {
        console.error('Lỗi khi cập nhật giá trị Mode:', error);
      });
    setThuCong(1); // Mode = 1
  }
  const handleCLickThuCong = () => { //Mode = 0
    set(ref(database, '/SmartHub/Mode'), 0)
      .then(() => {
        console.log('Giá trị Mode đã được cập nhật thành 0');
      })
      .catch((error) => {
        console.error('Lỗi khi cập nhật giá trị Mode:', error);
      });
    setThuCong(0);//Mode = 0
  }
  const handleDevice1 = () => {
    const deviceCurent = device1 === 0 ? 1 : 0;
    set(ref(database, '/SmartHub/Device1'), deviceCurent)
      .then(() => {
        console.log('Giá trị Device1 đã được cập nhật thành ' + deviceCurent);
      })
      .catch((error) => {
        console.error('Lỗi khi cập nhật giá trị Device:', error);
      });
    setDevice1(deviceCurent)
  }
  const handleDevice2 = () => {
    const deviceCurent = device2 === 0 ? 1 : 0;
    set(ref(database, '/SmartHub/Device2'), deviceCurent)
      .then(() => {
        console.log('Giá trị Device2 đã được cập nhật thành ' + deviceCurent);
      })
      .catch((error) => {
        console.error('Lỗi khi cập nhật giá trị Device:', error);
      });
    setDevice2(deviceCurent)
  }
  const handleDevice3 = () => {
    const deviceCurent = device3 === 0 ? 1 : 0;
    set(ref(database, '/SmartHub/Device3'), deviceCurent)
      .then(() => {
        console.log('Giá trị Device3 đã được cập nhật thành ' + deviceCurent);
      })
      .catch((error) => {
        console.error('Lỗi khi cập nhật giá trị Device:', error);
      });
    setDevice3(deviceCurent)
  }
  const handleDevice4 = () => {
    const deviceCurent = device4 === 0 ? 1 : 0;
    set(ref(database, '/SmartHub/Device4'), deviceCurent)
      .then(() => {
        console.log('Giá trị Device4 đã được cập nhật thành ' + deviceCurent);
      })
      .catch((error) => {
        console.error('Lỗi khi cập nhật giá trị Device:', error);
      });
    setDevice4(deviceCurent)
  }

  return (

    <>

      {isOnline === false && <div className="not-internet">
        <img src="/no-internet.jpg" alt="" />

      </div>}

      {
        isOnline === true &&
        <div className="App"
        >

          {/* cảnh báo khẩn cấp */}
          {thucong === 2 && <div className="urgent">
          </div>}
          {/* -- end cảnh báo khẩn cấp-- */}
          {/* <div className="logo mobile"><img className="logo" src="/logo.jpeg" alt="" /></div> */}
          {/* <div className="logo mobile"><img className="logo" src="/logo2.jpg" alt="" /></div> */}
          <div className='header'>
            <div className="logo"><img className="logo" src="/logo.jpeg" alt="" /></div>
            <div className="title"><h1>HỆ THỐNG GIÁM SÁT HỒ NUÔI TÔM <span>SỬ DỤNG IOT</span> </h1></div>
            <div className="logo"><img className="logo" src="/logo2.jpg" alt="" /></div>
          </div>
          <div className="body">
            <div className="sidebar">
              <h2 className='title-sidebar'>Bảng điều khiển</h2>
              <div className="survivalmode">
                {/* <h2>Chế độ</h2> */}
                <button className={`learn-more ${thucong === 1 ? 'active' : 'inactive'}`} onClick={() => { handleCLickTuDong() }}> Tự đông
                </button>
                <button className={`learn-more ${thucong === 0 ? 'active' : 'inactive'}`} onClick={() => { handleCLickThuCong() }}> Thủ công
                </button>
              </div>

              {thucong === 1 &&
                // eslint-disable-next-line
                <marquee className="message" scrollamount="12"><h3> Hệ thống hiện đang ở chế độ tự động...</h3></marquee>}
              {thucong !== 1 &&
                <div className='action-grounp'>

                  <div className="action">
                    <h2>Máy PH:</h2>
                    <label className="button" htmlFor="toggle">
                      <input id="toggle" type="checkbox" onChange={handleDevice1} checked={device1 === 1} />
                      <span className="slider"></span>
                    </label>
                  </div>
                  <div className="action">
                    <h2>Máy nhiệt độ:</h2>
                    <label className="button" htmlFor="toggle1">
                      <input id="toggle1" type="checkbox" onChange={handleDevice2} checked={device2 === 1} />
                      <span className="slider"></span>
                    </label>
                  </div>
                  <div className="action">
                    <h2>Máy OXY:</h2>
                    <label className="button" htmlFor="toggle2">
                      <input id="toggle2" type="checkbox" onChange={handleDevice3} checked={device3 === 1} />
                      <span className="slider"></span>
                    </label>
                  </div>
                  <div className="action">
                    <h2>Máy đo mực nước:</h2>
                    <label className="button" htmlFor="toggle3">
                      <input id="toggle3" type="checkbox" onChange={handleDevice4} checked={device4 === 1} />
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
                  animate={shouldRotate}
                  nrOfLevels={15}
                  percent={ph / 14}
                  // textColor="red"
                  needleColor="#BEBEBE"
                  // hideText
                  formatTextValue={() => ph}
                />
                <h2 className='title-thongso'>ĐỘ PH</h2>
                {thucong === 0 && <div className="action mobile">
                  <label className="button" htmlFor="toggle">
                    <input id="toggle" type="checkbox" onChange={handleDevice1} checked={device1 === 1} />
                    <span className="slider"></span>
                  </label>
                </div>}
              </div>

              <div className='thongso'>

                <GaugeChart id="gauge-chart3"
                  animate={shouldRotate}
                  percent={nhietdo / 100}
                  formatTextValue={(value) => nhietdo}
                />
                <h2 className='title-thongso'>NHIỆT ĐỘ (<sup> &#176;</sup>C)</h2>
                {thucong === 0 && <div className="action mobile">
                  <label className="button" htmlFor="toggle1">
                    <input id="toggle1" type="checkbox" onChange={handleDevice2} checked={device2 === 1} />
                    <span className="slider"></span>
                  </label>
                </div>}
              </div>
              <div className='thongso'>

                <GaugeChart id="gauge-chart5"
                  animate={shouldRotate}
                  nrOfLevels={30}
                  arcsLength={[0.3, 0.5, 0.2]}
                  colors={['#EA4228', '#F5CD19', '#5BE12C']}
                  percent={oxy / 10}
                  formatTextValue={() => oxy}
                />
                <h2 className='title-thongso'>ĐỘ OXY (<span> ml/L</span>)</h2>
                {thucong === 0 && <div className="action mobile">
                  <label className="button" htmlFor="toggle2">
                    <input id="toggle2" type="checkbox" onChange={handleDevice3} checked={device3 === 1} />
                    <span className="slider"></span>
                  </label>
                </div>}

              </div>
              <div className='thongso'>

                <GaugeChart id="gauge-chart5"
                  animate={shouldRotate}
                  nrOfLevels={420}
                  arcsLength={[0.4, 0.4, 0.2]}
                  colors={['#EA4228', '#F5CD19', '#5BE12C']}
                  percent={khoangcach / 300}
                  arcPadding={0.02}
                  formatTextValue={() => khoangcach}
                />
                <h2 className='title-thongso'>MỨC NƯỚC (<span> cm</span>)</h2>
                {thucong === 0 && <div className="action mobile">
                  <label className="button" htmlFor="toggle3">
                    <input id="toggle3" type="checkbox" onChange={handleDevice4} checked={device4 === 1} />
                    <span className="slider"></span>
                  </label>
                </div>}

              </div>
            </div>
          </div>

        </div>}
    </>
  );
}

export default App;
