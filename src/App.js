import react from 'react';
import {Container,Card,CardContent,makeStyles,Grid,TextField,Button,Divider } from '@material-ui/core';
import qrcode from 'qrcode';
import QrReader from 'react-qr-reader';


function App() {
  const classes= useStyles();
  let [text,setText]=react.useState("");
  let [ImageUrl,setImageUrl]=react.useState("");
  let [ScanResult,setScanResult]=react.useState("");
  let [scanResultWebCam,setScanResultWebCam]=react.useState("");

  let qrRef=react.useRef(null);

  const generateQr = async () => {
    try {
          const response = await qrcode.toDataURL(text);
          //console.log(response);
          setImageUrl(response);
    }catch (error) {
      console.log(error);
    }
  }


  const handleScanFile = (result) => {
    if (result) {
        setScanResult(result);
    }
}


const onScanFile = () => {
  qrRef.current.openImageDialog();
}


const handleScanWebCam = (result) => {
  if (result){
      setScanResultWebCam(result);
  }
 }

  function handleChangeG1(e){
    setText(e.target.value);
  }


  return (
    <Container className={classes.container}>

      <Card>
          <h2 className={classes.title}>GENERATE / DOWNLOAD / SCAN</h2>
          <CardContent>

              <Grid  container spacing={4}>
                <Grid item xl={4} lg={4} md={6} sm={12}>

                    <TextField className={classes.inputArea} label="Enter Link Here " onChange={handleChangeG1} />
                    <Divider />
                    <Button className={classes.btn} variant="contained" color="secondary" onClick={() => generateQr()}>
                    Generate QR
                    </Button>
                    <h5 className={classes.c2d}>Click on QR to download</h5>
                    <a href={ImageUrl} download>
                   
                    <img className={classes.QRimage} src={ImageUrl} ></img>
                    </a>
                </Grid>

                <Grid item xl={4} lg={4} md={6} sm={12}>

                <Button className={classes.btn} variant="contained" color="secondary" onClick={onScanFile}>UPLOAD QR</Button>
                <QrReader
                  ref={qrRef}
                  delay={300}
                  style={{width: '100%'}}
                  onError={(error) => {console.log(error)}}
                  onScan={handleScanFile}
                  legacyMode
                />

                      <h3>SCANNED RESULT : {ScanResult}</h3>

                </Grid>

                <Grid  item xl={4} lg={4} md={6} sm={12}>
                  <h5 className={classes.G3Text}>SCAN BY WEBCAM</h5>
                <QrReader
                   delay={300}
                   style={{width: '100%'}}
                   onError={(error) => {console.log(error)}}
                   onScan={handleScanWebCam}
                  />

                  <h3>SCANNED RESULT :{scanResultWebCam}</h3>

                </Grid>

              </Grid>

          </CardContent>

      </Card>
      
      <footer className={classes.footer}>
      <p>Made By :</p>
      <p className={classes.footerName}>
         Aditya Prasad Mishra       
      </p>
      </footer>
     

      <div className={classes.footerIcons}>
      <a href="https://github.com/adimishrax7x"><i className={classes.Icon} class="fab fa-github fa-2x"></i></a>
      
      <a href="https://www.linkedin.com/in/aditya-prasad-mishra-9555571a5/"><i className={classes.Icon} class="fab fa-linkedin fa-2x"></i></a>
      </div>


    </Container>

    
  );
}

const useStyles = makeStyles((themes)=>({

  container :{
    marginTop :'10px'
  },
  title:{
    display :'flex',
    justifyContent :'center',
    background:'#F8485E',
    color:'#fff',
    padding :'30px',
    fontWeight:'350'
  },
  inputArea:{
    display :'flex',
    justifyContent :'center'

  },
  btn:{
    display :'flex',
    justifyContent :'right',
    marginTop:10,
    marginBottom:20
  },
  QRimage:{
    display :'flex',
    justifyContent :'center',
    width:'100%'
  },
  c2d:{
    color: 'grey',
    textDecoration:'underline white',
    textAlign:'center'
  },
  G3Text:{
    color:'#F8485E',
    display :'flex',
    justifyContent :'center'
  },
  footerName:{
    color:'#F8485E',
    display :'flex',
    
  },
  footer:{
    display :'flex',
    justifyContent :'center'
  },
  footerIcons:{
    display :'flex',
    justifyContent :'center'
  },
  Icon:{
    background:'#F8485E',
    marginLeft:'10%'
  }

}))

export default App;
