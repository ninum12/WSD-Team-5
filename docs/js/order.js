function waitForKakao(callback) {
  if (typeof kakao !== 'undefined' && kakao.maps) {
    callback();
  } else {
    setTimeout(() => waitForKakao(callback), 100);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const agreeAll = document.getElementById("agree-all");
  const submitButton = document.querySelector(".submit-button");
  const refundInfo = document.querySelector(".refund-info");
  const payMethods = document.getElementsByName("pay-method");
  const methodRadios = document.getElementsByName("method");
  const lockerInfo = document.getElementById("locker-info");
  const directInfo = document.getElementById("direct-info");

  agreeAll.addEventListener("change", () => {
    submitButton.disabled = !agreeAll.checked;
  });

  const toggleRefundInfo = () => {
    const selected = [...payMethods].find(radio => radio.checked)?.value;
    refundInfo.style.display = selected === "account" ? "flex" : "none";
  };
  toggleRefundInfo();
  payMethods.forEach(radio => {
    radio.addEventListener("change", toggleRefundInfo);
  });

  const toggleTradeMethod = () => {
    const selected = [...methodRadios].find(r => r.checked)?.value;
    if (selected === "사물함") {
      lockerInfo.style.display = "block";
      directInfo.style.display = "none";
    } else {
      lockerInfo.style.display = "none";
      directInfo.style.display = "block";
      setTimeout(() => {
        if (window.directMap) {
          window.directMap.relayout();
        }
      }, 300);
    }
  };
  toggleTradeMethod();
  methodRadios.forEach(r => r.addEventListener("change", toggleTradeMethod));

  waitForKakao(() => {
    const directMapContainer = document.getElementById('direct-map');
    if (directMapContainer) {
      const directMap = new kakao.maps.Map(directMapContainer, {
        center: new kakao.maps.LatLng(37.5460, 126.9649),
        level: 3
      });
      window.directMap = directMap;

      const marker = new kakao.maps.Marker();

      kakao.maps.event.addListener(directMap, 'click', function (mouseEvent) {
        const latlng = mouseEvent.latLng;
        marker.setPosition(latlng);
        marker.setMap(directMap);
      });
    }
  });
});
