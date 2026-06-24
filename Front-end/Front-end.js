const images = document.querySelectorAll(".image");
const videos = document.querySelectorAll("video");

let animation = [null, null];

const imageBoxs = document.querySelectorAll(".imageBox");

imageBoxs.forEach((image, index) => {
  image.addEventListener("mouseenter", () => {
    // 播放正向動畫

    animation[index] = images[index].animate(
      [{ objectPosition: "top" }, { objectPosition: "bottom" }],
      {
        duration: 5000,
        easing: "ease-in-out",
        fill: "forwards",
      },
    );
  });

  image.addEventListener("mouseleave", () => {
    // 播放倒轉動畫
    if (animation[index]) {
      animation[index].reverse();
    }
  });
});

const videoBoxs = document.querySelectorAll(".videoBox");

videos.forEach((video) => {
  video.addEventListener("ended", () => {
    video.currentTime = 0;
    video.play().catch((e) => console.log("循環播放重啟失敗", e));
  });
});

videoBoxs.forEach((videoBox, index) => {
  videoBox.addEventListener("mouseover", async () => {
    try {
      await videos[index].play();
    } catch (err) {
      console.warn("自動播放被攔截，通常是因為尚未與網頁互動:", err);
    }
  });

  videoBox.addEventListener("mouseout", () => {
    videos[index].pause();
  });
});
