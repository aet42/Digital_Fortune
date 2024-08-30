document.addEventListener('DOMContentLoaded', function() {
    alert("デバイスを振っておみくじをひこう！");

    var pages = [
        "resultpages/page1.html",
        "resultpages/page2.html",
        "resultpages/page3.html",
        "resultpages/page4.html",
        "resultpages/page5.html",
        "resultpages/page6.html",
        "resultpages/page7.html"
    ];

    function getRandomPage() {
        var randomIndex = Math.floor(Math.random() * pages.length);
        return pages[randomIndex];
    }

    function onDeviceShake() {
        var randomPage = getRandomPage();
        console.log('Navigating to:', randomPage); // デバッグ用
        window.location.href = randomPage;
    }

    var isShaking = false;

    function handleDeviceMotion(event) {
        var acceleration = event.accelerationIncludingGravity;
        if (acceleration) {
            var x = acceleration.x || 0;
            var y = acceleration.y || 0;
            var z = acceleration.z || 0;

            var threshold = 10; // 閾値を下げて感度を向上
            if (Math.abs(x) > threshold || Math.abs(y) > threshold || Math.abs(z) > threshold) {
                if (!isShaking) {
                    isShaking = true;
                    onDeviceShake();
                    setTimeout(function() {
                        isShaking = false;
                    }, 1000); // デバウンスのために1秒待機
                }
            }
        }
    }

    function initializeMotionListeners() {
        if ('DeviceMotionEvent' in window) {
            window.addEventListener('devicemotion', handleDeviceMotion);
        } else {
            alert('このデバイスはモーションセンサーに対応していません。');
        }
    }

    // デバイスモーションリスナーを初期化
    initializeMotionListeners();
});
