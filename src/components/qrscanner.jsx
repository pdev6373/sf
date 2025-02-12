import { useEffect, useRef } from "react";
import { Html5Qrcode } from "html5-qrcode";

const QrScanner = ({ onResult }) => {
  const qrCodeRegionId = "reader";
  const html5QrCodeRef = useRef(null);

  useEffect(() => {
    const html5QrCode = new Html5Qrcode(qrCodeRegionId);
    html5QrCodeRef.current = html5QrCode;

    const config = {
      fps: 10,
      qrbox: { width: 361, height: 281 }
    };

    html5QrCode
      .start(
        { facingMode: "environment" },
        config,
        (decodedText, decodedResult) => {
          onResult(decodedText, decodedResult);
        },
        (errorMessage) => {
          // Handle scan errors here
        }
      )
      .catch((err) => {
        console.error("Unable to start scanning.", err);
      });

    return () => {
      html5QrCode.stop().catch((err) => console.error("Failed to stop.", err));
    };
  }, [onResult]);

  return <div id={qrCodeRegionId} style={{ width: "100%", height: "auto" }} />;
};

export default QrScanner;
