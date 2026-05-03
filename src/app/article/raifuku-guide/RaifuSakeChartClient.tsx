"use client";

import { useState } from "react";

const sakeData = [
  // 左上: 甘口・スッキリ（x<50, y>50）
  { id: 1, name: "純米吟醸\nなでしこの花酵母", short: "なでしこ", x: 22, y: 78, emoji: "🌸", desc: "花のような上品な甘み。初心者にも大人気", affiliateHtml: '<a href="https://hb.afl.rakuten.co.jp/ichiba/52dd99d1.d2f48cd6.52dd99d2.3ce57010/?pc=https%3A%2F%2Fitem.rakuten.co.jp%2Fkikusui-sake-shop%2F4935707015896%2F&link_type=pict&ut=eyJwYWdlIjoiaXRlbSIsInR5cGUiOiJwaWN0Iiwic2l6ZSI6IjMwMHgzMDAiLCJuYW0iOjEsIm5hbXAiOiJyaWdodCIsImNvbSI6MSwiY29tcCI6ImRvd24iLCJwcmljZSI6MCwiYm9yIjoxLCJjb2wiOjEsImJidG4iOjEsInByb2QiOjAsImFtcCI6ZmFsc2V9" target="_blank" rel="nofollow sponsored noopener" style="word-wrap:break-word;"><img src="https://hbb.afl.rakuten.co.jp/hgb/52dd99d1.d2f48cd6.52dd99d2.3ce57010/?me_id=1434713&item_id=10000063&pc=https%3A%2F%2Fthumbnail.image.rakuten.co.jp%2F%400_mall%2Fkikusui-sake-shop%2Fcabinet%2Fshohin%2Fimgrc0101260939.jpg%3F_ex%3D300x300&s=300x300&t=pict" border="0" style="margin:2px" alt="" title=""></a>' },
  { id: 2, name: "純米大吟醸\n超精米8%", short: "超精米8%", x: 30, y: 85, emoji: "✨", desc: "雑味ゼロの究極の透明感。フルーティーで軽快", affiliateHtml: '<a href="https://hb.afl.rakuten.co.jp/ichiba/3f6c8ad9.08e087e0.3f6c8ada.7a802074/?pc=https%3A%2F%2Fitem.rakuten.co.jp%2Fshidukuya%2Fraihuku018%2F&link_type=pict&ut=eyJwYWdlIjoiaXRlbSIsInR5cGUiOiJwaWN0Iiwic2l6ZSI6IjMwMHgzMDAiLCJuYW0iOjEsIm5hbXAiOiJyaWdodCIsImNvbSI6MSwiY29tcCI6ImRvd24iLCJwcmljZSI6MCwiYm9yIjoxLCJjb2wiOjEsImJidG4iOjEsInByb2QiOjAsImFtcCI6ZmFsc2V9" target="_blank" rel="nofollow sponsored noopener" style="word-wrap:break-word;"><img src="https://hbb.afl.rakuten.co.jp/hgb/3f6c8ad9.08e087e0.3f6c8ada.7a802074/?me_id=1282651&item_id=10000541&pc=https%3A%2F%2Fthumbnail.image.rakuten.co.jp%2F%400_mall%2Fshidukuya%2Fcabinet%2F03078492%2F03079637%2Fimg69245505.jpg%3F_ex%3D300x300&s=300x300&t=pict" border="0" style="margin:2px" alt="" title=""></a>' },

  { id: 4, name: "大吟醸\n雫", short: "雫", x: 28, y: 90, emoji: "💧", desc: "雫取りの最高峰。エレガントで繊細", affiliateHtml: '<a href="https://hb.afl.rakuten.co.jp/ichiba/52dd99d1.d2f48cd6.52dd99d2.3ce57010/?pc=https%3A%2F%2Fitem.rakuten.co.jp%2Fkikusui-sake-shop%2F4935707013274%2F&link_type=pict&ut=eyJwYWdlIjoiaXRlbSIsInR5cGUiOiJwaWN0Iiwic2l6ZSI6IjMwMHgzMDAiLCJuYW0iOjEsIm5hbXAiOiJyaWdodCIsImNvbSI6MSwiY29tcCI6ImRvd24iLCJwcmljZSI6MCwiYm9yIjoxLCJjb2wiOjEsImJidG4iOjEsInByb2QiOjAsImFtcCI6ZmFsc2V9" target="_blank" rel="nofollow sponsored noopener" style="word-wrap:break-word;"><img src="https://hbb.afl.rakuten.co.jp/hgb/52dd99d1.d2f48cd6.52dd99d2.3ce57010/?me_id=1434713&item_id=10000026&pc=https%3A%2F%2Fthumbnail.image.rakuten.co.jp%2F%400_mall%2Fkikusui-sake-shop%2Fcabinet%2Fshohin%2Fimgrc0098867844.jpg%3F_ex%3D300x300&s=300x300&t=pict" border="0" style="margin:2px" alt="" title=""></a>' },
  // 右上: 辛口・スッキリ（x>50, y>50）
  { id: 5, name: "純米吟醸\nいちごの花酵母", short: "いちご花酵母", x: 62, y: 75, emoji: "🍓", desc: "名前は甘そうだが実はキレ系。ギャップが面白い！", affiliateHtml: '<a href="https://hb.afl.rakuten.co.jp/ichiba/40a48afe.0cfaf26f.40a48aff.35c6f521/?pc=https%3A%2F%2Fitem.rakuten.co.jp%2Fkuranosuke%2F1283%2F&link_type=pict&ut=eyJwYWdlIjoiaXRlbSIsInR5cGUiOiJwaWN0Iiwic2l6ZSI6IjMwMHgzMDAiLCJuYW0iOjEsIm5hbXAiOiJyaWdodCIsImNvbSI6MSwiY29tcCI6ImRvd24iLCJwcmljZSI6MCwiYm9yIjoxLCJjb2wiOjEsImJidG4iOjEsInByb2QiOjAsImFtcCI6ZmFsc2V9" target="_blank" rel="nofollow sponsored noopener" style="word-wrap:break-word;"><img src="https://hbb.afl.rakuten.co.jp/hgb/40a48afe.0cfaf26f.40a48aff.35c6f521/?me_id=1204944&item_id=10010839&pc=https%3A%2F%2Fthumbnail.image.rakuten.co.jp%2F%400_mall%2Fkuranosuke%2Fcabinet%2F83%2F1283_1.jpg%3F_ex%3D300x300&s=300x300&t=pict" border="0" style="margin:2px" alt="" title=""></a>' },
  { id: 6, name: "純米吟醸\n亀の尾", short: "亀の尾", x: 75, y: 68, emoji: "🐢", desc: "古代米「亀の尾」使用。キレがあり食中酒として最適", affiliateHtml: '<a href="https://hb.afl.rakuten.co.jp/ichiba/40a48afe.0cfaf26f.40a48aff.35c6f521/?pc=https%3A%2F%2Fitem.rakuten.co.jp%2Fkuranosuke%2F3501%2F&link_type=pict&ut=eyJwYWdlIjoiaXRlbSIsInR5cGUiOiJwaWN0Iiwic2l6ZSI6IjMwMHgzMDAiLCJuYW0iOjEsIm5hbXAiOiJyaWdodCIsImNvbSI6MSwiY29tcCI6ImRvd24iLCJwcmljZSI6MCwiYm9yIjoxLCJjb2wiOjEsImJidG4iOjEsInByb2QiOjAsImFtcCI6ZmFsc2V9" target="_blank" rel="nofollow sponsored noopener" style="word-wrap:break-word;"><img src="https://hbb.afl.rakuten.co.jp/hgb/40a48afe.0cfaf26f.40a48aff.35c6f521/?me_id=1204944&item_id=10009949&pc=https%3A%2F%2Fthumbnail.image.rakuten.co.jp%2F%400_mall%2Fkuranosuke%2Fcabinet%2F01%2F3501_1.jpg%3F_ex%3D300x300&s=300x300&t=pict" border="0" style="margin:2px" alt="" title=""></a>' },
  // 左下: 甘口・しっかり（x<50, y<50）
  { id: 7, name: "貴醸酒\nMELLOW オーク樽熟成", short: "MELLOW", x: 20, y: 22, emoji: "🍯", desc: "デザート感覚で楽しむ濃厚な甘み。ウイスキー好きにも" },
  // 右下: 辛口・しっかり（x>50, y<50）
  { id: 8, name: "純米吟醸生原酒\n愛山", short: "愛山", x: 68, y: 38, emoji: "⛰️", desc: "幻の酒米「愛山」。旨みと力強さが共存", affiliateHtml: '<a href="https://hb.afl.rakuten.co.jp/ichiba/3e8d5ce7.ece59876.3e8d5ce8.34c8adb5/?pc=https%3A%2F%2Fitem.rakuten.co.jp%2Fjizake-watanabe%2F10008559%2F&link_type=pict&ut=eyJwYWdlIjoiaXRlbSIsInR5cGUiOiJwaWN0Iiwic2l6ZSI6IjMwMHgzMDAiLCJuYW0iOjEsIm5hbXAiOiJyaWdodCIsImNvbSI6MSwiY29tcCI6ImRvd24iLCJwcmljZSI6MCwiYm9yIjoxLCJjb2wiOjEsImJidG4iOjEsInByb2QiOjAsImFtcCI6ZmFsc2V9" target="_blank" rel="nofollow sponsored noopener" style="word-wrap:break-word;"><img src="https://hbb.afl.rakuten.co.jp/hgb/3e8d5ce7.ece59876.3e8d5ce8.34c8adb5/?me_id=1214778&item_id=10008559&pc=https%3A%2F%2Fthumbnail.image.rakuten.co.jp%2F%400_mall%2Fjizake-watanabe%2Fcabinet%2F06300917%2F07074642%2Fimgrc0106105406.jpg%3F_ex%3D300x300&s=300x300&t=pict" border="0" style="margin:2px" alt="" title=""></a>' },
  { id: 9, name: "純米酒\n安康", short: "安康", x: 60, y: 25, emoji: "🌾", desc: "縁起の良い鮟鱇にちなんだ冬限定酒。スッキリとした飲み口に柑橘系の香りとジューシーさが広がる。" },
  { id: 10, name: "純米大吟醸\n別誂", short: "別誂", x: 78, y: 32, emoji: "🎌", desc: "日本酒通をうならせる本格派。余韻が長い", affiliateHtml: '<a href="https://hb.afl.rakuten.co.jp/ichiba/3f6c8ad9.08e087e0.3f6c8ada.7a802074/?pc=https%3A%2F%2Fitem.rakuten.co.jp%2Fshidukuya%2Fraihuku035%2F&link_type=pict&ut=eyJwYWdlIjoiaXRlbSIsInR5cGUiOiJwaWN0Iiwic2l6ZSI6IjMwMHgzMDAiLCJuYW0iOjEsIm5hbXAiOiJyaWdodCIsImNvbSI6MSwiY29tcCI6ImRvd24iLCJwcmljZSI6MCwiYm9yIjoxLCJjb2wiOjEsImJidG4iOjEsInByb2QiOjAsImFtcCI6ZmFsc2V9" target="_blank" rel="nofollow sponsored noopener" style="word-wrap:break-word;"><img src="https://hbb.afl.rakuten.co.jp/hgb/3f6c8ad9.08e087e0.3f6c8ada.7a802074/?me_id=1282651&item_id=10001089&pc=https%3A%2F%2Fthumbnail.image.rakuten.co.jp%2F%400_mall%2Fshidukuya%2Fcabinet%2F03078492%2F03079637%2Fimgrc0070938901.jpg%3F_ex%3D300x300&s=300x300&t=pict" border="0" style="margin:2px" alt="" title=""></a>' },
  { id: 11, name: "真向勝負\n純米大吟醸", short: "真向勝負", x: 85, y: 18, emoji: "⚔️", desc: "その名の通り正面勝負。辛口でコクが深い", affiliateHtml: '<a href="https://hb.afl.rakuten.co.jp/ichiba/40a48afe.0cfaf26f.40a48aff.35c6f521/?pc=https%3A%2F%2Fitem.rakuten.co.jp%2Fkuranosuke%2Frai1200%2F&link_type=pict&ut=eyJwYWdlIjoiaXRlbSIsInR5cGUiOiJwaWN0Iiwic2l6ZSI6IjMwMHgzMDAiLCJuYW0iOjEsIm5hbXAiOiJyaWdodCIsImNvbSI6MSwiY29tcCI6ImRvd24iLCJwcmljZSI6MCwiYm9yIjoxLCJjb2wiOjEsImJidG4iOjEsInByb2QiOjAsImFtcCI6ZmFsc2V9" target="_blank" rel="nofollow sponsored noopener" style="word-wrap:break-word;"><img src="https://hbb.afl.rakuten.co.jp/hgb/40a48afe.0cfaf26f.40a48aff.35c6f521/?me_id=1204944&item_id=10001247&pc=https%3A%2F%2Fthumbnail.image.rakuten.co.jp%2F%400_mall%2Fkuranosuke%2Fcabinet%2F00%2Frai1200_1.jpg%3F_ex%3D300x300&s=300x300&t=pict" border="0" style="margin:2px" alt="" title=""></a>' },
  { id: 12, name: "純米吟醸生原酒\nX 黒", short: "X 黒", x: 72, y: 15, emoji: "⬛", desc: "生原酒ならではのパワフルな旨み。上級者向け", affiliateHtml: '<a href="https://hb.afl.rakuten.co.jp/ichiba/4b051cd8.d75aacc6.4b051cd9.805a7e55/?pc=https%3A%2F%2Fitem.rakuten.co.jp%2Fsake-akiyama%2Fraifuku_jg_x_jika_nude_720%2F&link_type=pict&ut=eyJwYWdlIjoiaXRlbSIsInR5cGUiOiJwaWN0Iiwic2l6ZSI6IjMwMHgzMDAiLCJuYW0iOjEsIm5hbXAiOiJyaWdodCIsImNvbSI6MSwiY29tcCI6ImRvd24iLCJwcmljZSI6MSwiYm9yIjoxLCJjb2wiOjEsImJidG4iOjEsInByb2QiOjAsImFtcCI6ZmFsc2V9" target="_blank" rel="nofollow sponsored noopener" style="word-wrap:break-word;"><img src="https://hbb.afl.rakuten.co.jp/hgb/4b051cd8.d75aacc6.4b051cd9.805a7e55/?me_id=1340633&item_id=10003152&pc=https%3A%2F%2Fthumbnail.image.rakuten.co.jp%2F%400_mall%2Fsake-akiyama%2Fcabinet%2Fshohin%2Fraifuku%2Fimgrc0119704140.jpg%3F_ex%3D300x300&s=300x300&t=pict" border="0" style="margin:2px" alt="" title=""></a>' },
];

const quadrants = [
  {
    key: "tl", x: 0, y: 0, w: "50%", h: "50%",
    bg: "rgba(255,182,193,0.07)",
    border: "rgba(255,182,193,0.15)",
    title: "華やか・初心者向け",
    subtitle: "甘口 × スッキリ",
    color: "#f4a7b9",
    hint: "🌸 フルーティーで飲みやすい",
  },
  {
    key: "tr", x: "50%", y: 0, w: "50%", h: "50%",
    bg: "rgba(152,216,200,0.07)",
    border: "rgba(152,216,200,0.15)",
    title: "キレ重視・食中酒向け",
    subtitle: "辛口 × スッキリ",
    color: "#7ecfb8",
    hint: "🍽️ お食事と一緒に",
  },
  {
    key: "bl", x: 0, y: "50%", w: "50%", h: "50%",
    bg: "rgba(255,220,120,0.07)",
    border: "rgba(255,220,120,0.15)",
    title: "デザート感覚・変わり種",
    subtitle: "甘口 × しっかり",
    color: "#f0c560",
    hint: "🍯 食後酒・チーズと合わせて",
  },
  {
    key: "br", x: "50%", y: "50%", w: "50%", h: "50%",
    bg: "rgba(180,160,220,0.07)",
    border: "rgba(180,160,220,0.15)",
    title: "旨み重視・日本酒好きへ",
    subtitle: "辛口 × しっかり",
    color: "#b8a0dc",
    hint: "🌾 お米の力強さを堪能",
  },
];

export default function RaifuSakeChartClient() {
  const [hovered, setHovered] = useState<number | null>(null);
  const [selected, setSelected] = useState<number | null>(null);

  const hoveredSake = sakeData.find(s => s.id === hovered);
  const selectedSake = sakeData.find(s => s.id === selected);
  const displaySake = hoveredSake || selectedSake;

  return (
    <div style={{
      background: "transparent",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      padding: "2rem 1rem",
      fontFamily: "'Hiragino Mincho ProN', 'Yu Mincho', 'MS Mincho', serif",
    }}>
      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: "1.5rem" }}>
        <div style={{ fontSize: "0.65rem", letterSpacing: "0.5em", color: "#8b7355", marginBottom: "0.4rem", fontFamily: "'Hiragino Kaku Gothic ProN', sans-serif" }}>
          RAIFUKU SAKE BREWERY
        </div>
        <h1 style={{
          fontSize: "1.6rem",
          color: "#2c1a0e",
          margin: 0,
          letterSpacing: "0.15em",
          fontWeight: 700,
        }}>
          来福酒造 銘柄ガイド
        </h1>
        <div style={{ fontSize: "0.72rem", color: "#8b7355", marginTop: "0.3rem", letterSpacing: "0.2em" }}>
          味わいの四象限マトリックス
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "2rem", alignItems: "center", width: "100%", maxWidth: "800px" }}>
        
        {/* Top Section: Chart + Quadrant Guide */}
        <div style={{ display: "flex", gap: "1.5rem", alignItems: "flex-start", flexWrap: "wrap", justifyContent: "center" }}>
          {/* Chart */}
          <div style={{ position: "relative" }}>
            {/* Y axis label */}
            <div style={{
              position: "absolute",
              left: -52,
              top: "50%",
              transform: "translateY(-50%) rotate(-90deg)",
              whiteSpace: "nowrap",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 4,
            }}>
              <span style={{ fontSize: "0.7rem", color: "#c09060", letterSpacing: "0.2em" }}>軽快・スッキリ ▲</span>
            </div>

            <div style={{ position: "relative", width: 520, height: 520 }}>
              {/* Quadrant backgrounds */}
              {quadrants.map(q => (
                <div key={q.key} style={{
                  position: "absolute",
                  left: q.x, top: q.y,
                  width: q.w, height: q.h,
                  background: q.bg,
                  border: `1px solid ${q.border}`,
                  boxSizing: "border-box",
                }}>
                  <div style={{
                    position: "absolute",
                    top: "50%", left: "50%",
                    transform: "translate(-50%,-50%)",
                    textAlign: "center",
                    pointerEvents: "none",
                  }}>
                    <div style={{ fontSize: "0.58rem", color: q.color, letterSpacing: "0.15em", fontFamily: "'Hiragino Kaku Gothic ProN', sans-serif", whiteSpace: "nowrap" }}>
                      {q.hint}
                    </div>
                  </div>
                </div>
              ))}

              {/* Axes */}
              <div style={{
                position: "absolute", left: "50%", top: 0,
                width: 1, height: "100%",
                background: "linear-gradient(to bottom, transparent, #8b7355 20%, #8b7355 80%, transparent)",
                opacity: 0.4,
              }} />
              <div style={{
                position: "absolute", top: "50%", left: 0,
                height: 1, width: "100%",
                background: "linear-gradient(to right, transparent, #8b7355 20%, #8b7355 80%, transparent)",
                opacity: 0.4,
              }} />

              {/* Axis arrows & labels at edges */}
              <div style={{ position: "absolute", top: 6, left: "50%", transform: "translateX(-50%)", fontSize: "0.6rem", color: "#8b7355", letterSpacing: "0.1em" }}>▲</div>
              <div style={{ position: "absolute", bottom: 6, left: "50%", transform: "translateX(-50%)", fontSize: "0.6rem", color: "#8b7355", letterSpacing: "0.1em" }}>▼</div>
              <div style={{ position: "absolute", left: 6, top: "50%", transform: "translateY(-50%)", fontSize: "0.6rem", color: "#c09060", letterSpacing: "0.1em" }}>◀</div>
              <div style={{ position: "absolute", right: 6, top: "50%", transform: "translateY(-50%)", fontSize: "0.6rem", color: "#c09060", letterSpacing: "0.1em" }}>▶</div>

              {/* Quadrant corner labels */}
              {[
                { label: "甘口・スッキリ", x: 4, y: 4, align: "left" },
                { label: "辛口・スッキリ", x: "calc(50% + 6px)", y: 4, align: "left" },
                { label: "甘口・しっかり", x: 4, y: "calc(50% + 6px)", align: "left" },
                { label: "辛口・しっかり", x: "calc(50% + 6px)", y: "calc(50% + 6px)", align: "left" },
              ].map((l, i) => (
                <div key={i} style={{
                  position: "absolute",
                  left: l.x, top: l.y,
                  fontSize: "0.55rem",
                  color: "#a08060",
                  letterSpacing: "0.1em",
                  fontFamily: "'Hiragino Kaku Gothic ProN', sans-serif",
                  opacity: 0.7,
                }}>{l.label}</div>
              ))}

              {/* Sake dots */}
              {sakeData.map(sake => {
                const isHov = hovered === sake.id;
                const isSel = selected === sake.id;
                const active = isHov || isSel;
                return (
                  <div
                    key={sake.id}
                    onMouseEnter={() => setHovered(sake.id)}
                    onMouseLeave={() => setHovered(null)}
                    onClick={() => setSelected(selected === sake.id ? null : sake.id)}
                    style={{
                      position: "absolute",
                      left: `${sake.x}%`,
                      top: `${100 - sake.y}%`,
                      transform: "translate(-50%,-50%)",
                      cursor: "pointer",
                      zIndex: active ? 20 : 10,
                      transition: "all 0.2s ease",
                    }}
                  >
                    {active && (
                      <div style={{
                        position: "absolute",
                        left: "50%", top: "50%",
                        transform: "translate(-50%,-50%)",
                        width: 36, height: 36,
                        borderRadius: "50%",
                        background: "rgba(180,130,60,0.15)",
                        border: "1px solid rgba(180,130,60,0.4)",
                        animation: "pulse 1.5s infinite",
                      }} />
                    )}
                    <div style={{
                      width: active ? 22 : 16,
                      height: active ? 22 : 16,
                      borderRadius: "50%",
                      background: active
                        ? "linear-gradient(135deg, #d4924a, #8b5e1a)"
                        : "linear-gradient(135deg, #b8855a, #6e4520)",
                      border: `2px solid ${active ? "#f0c880" : "#c09060"}`,
                      boxShadow: active
                        ? "0 0 12px rgba(212,146,74,0.6), 0 2px 8px rgba(0,0,0,0.3)"
                        : "0 1px 4px rgba(0,0,0,0.2)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: active ? "0.65rem" : "0.55rem",
                      transition: "all 0.2s ease",
                    }}>
                      {sake.emoji}
                    </div>
                    <div style={{
                      position: "absolute",
                      top: active ? -28 : -22,
                      left: "50%",
                      transform: "translateX(-50%)",
                      background: active ? "rgba(44,26,14,0.95)" : "rgba(44,26,14,0.75)",
                      color: active ? "#f0c880" : "#d4b896",
                      fontSize: "0.55rem",
                      padding: "2px 6px",
                      borderRadius: 2,
                      whiteSpace: "nowrap",
                      letterSpacing: "0.05em",
                      border: active ? "1px solid rgba(240,200,128,0.4)" : "none",
                      transition: "all 0.2s ease",
                    }}>
                      {sake.short}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* X axis label below */}
            <div style={{ textAlign: "center", marginTop: 8, display: "flex", justifyContent: "space-between", paddingInline: "2rem" }}>
              <span style={{ fontSize: "0.65rem", color: "#c09060", letterSpacing: "0.15em" }}>◀ 甘口・フルーティー</span>
              <span style={{ fontSize: "0.65rem", color: "#c09060", letterSpacing: "0.15em" }}>辛口・キレ ▶</span>
            </div>
            <div style={{ textAlign: "center", fontSize: "0.6rem", color: "#8b7355", marginTop: 2, letterSpacing: "0.1em" }}>
              ↕ 味わいの濃淡（縦軸） ｜ ↔ 味わいの方向性（横軸）
            </div>
          </div>

          {/* Side panel (now only contains Quadrant guide) */}
          <div style={{ width: 220, display: "flex", flexDirection: "column", gap: "1rem" }}>
            {/* Quadrant guide */}
            {quadrants.map(q => (
              <div key={q.key} style={{
                background: q.bg,
                border: `1px solid ${q.border}`,
                padding: "0.7rem 0.9rem",
              }}>
                <div style={{ fontSize: "0.62rem", color: q.color, fontWeight: 700, letterSpacing: "0.1em", marginBottom: "0.2rem", fontFamily: "'Hiragino Kaku Gothic ProN', sans-serif" }}>
                  {q.title}
                </div>
                <div style={{ fontSize: "0.55rem", color: "#8b7355", letterSpacing: "0.08em" }}>
                  {q.hint}
                </div>
                <div style={{ marginTop: "0.4rem", display: "flex", flexWrap: "wrap", gap: 3 }}>
                  {sakeData
                    .filter(s => {
                      if (q.key === "tl") return s.x < 50 && s.y >= 50;
                      if (q.key === "tr") return s.x >= 50 && s.y >= 50;
                      if (q.key === "bl") return s.x < 50 && s.y < 50;
                      return s.x >= 50 && s.y < 50;
                    })
                    .map(s => (
                      <span key={s.id} style={{
                        fontSize: "0.52rem",
                        color: "#6b5540",
                        background: "rgba(139,115,85,0.1)",
                        padding: "1px 4px",
                        borderRadius: 2,
                      }}>{s.emoji} {s.short}</span>
                    ))
                  }
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Section: Info card (Selected sake description + Affiliate link) */}
        <div style={{ width: "100%", maxWidth: "760px", marginTop: "1rem" }}>
          <div style={{
            background: displaySake ? "rgba(44,26,14,0.9)" : "rgba(44,26,14,0.6)",
            border: `1px solid ${displaySake ? "rgba(240,200,128,0.5)" : "rgba(180,130,60,0.2)"}`,
            padding: "2rem",
            minHeight: 180,
            transition: "all 0.3s ease",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center"
          }}>
            {displaySake ? (
              <>
                <div style={{ fontSize: "1.8rem", marginBottom: "0.5rem" }}>{displaySake.emoji}</div>
                <div style={{ color: "#f0c880", fontSize: "1.2rem", fontWeight: 700, lineHeight: 1.4, marginBottom: "0.8rem", whiteSpace: "pre-wrap" }}>
                  {displaySake.name}
                </div>
                <div style={{ color: "#c4a882", fontSize: "0.9rem", lineHeight: 1.6, letterSpacing: "0.05em", marginBottom: "1.5rem" }}>
                  {displaySake.desc}
                </div>
                <div style={{ marginBottom: "2rem", display: "flex", gap: 12, justifyContent: "center" }}>
                  <span style={{ fontSize: "0.7rem", color: "#8b7355", background: "rgba(139,115,85,0.15)", padding: "4px 10px", borderRadius: 4 }}>
                    X: {displaySake.x < 50 ? "甘口寄り" : "辛口寄り"}
                  </span>
                  <span style={{ fontSize: "0.7rem", color: "#8b7355", background: "rgba(139,115,85,0.15)", padding: "4px 10px", borderRadius: 4 }}>
                    Y: {displaySake.y > 50 ? "スッキリ" : "しっかり"}
                  </span>
                </div>
                
                {/* Affiliate Link */}
                {'affiliateHtml' in displaySake && displaySake.affiliateHtml ? (
                  <div dangerouslySetInnerHTML={{ __html: displaySake.affiliateHtml }} />
                ) : (
                  <a 
                    href={`https://search.rakuten.co.jp/search/mall/来福+${encodeURIComponent(displaySake.short)}/`}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "8px",
                      background: "#bf0000",
                      color: "white",
                      padding: "0.8rem 2rem",
                      borderRadius: "4px",
                      fontSize: "0.9rem",
                      fontWeight: "bold",
                      textDecoration: "none",
                      letterSpacing: "0.05em",
                      boxShadow: "0 4px 6px rgba(0,0,0,0.2)",
                      transition: "opacity 0.2s"
                    }}
                    onMouseOver={(e) => e.currentTarget.style.opacity = "0.8"}
                    onMouseOut={(e) => e.currentTarget.style.opacity = "1"}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="9" cy="21" r="1"></circle>
                      <circle cx="20" cy="21" r="1"></circle>
                      <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                    </svg>
                    楽天市場で探す
                  </a>
                )}
              </>
            ) : (
              <div style={{ color: "#6b5540", fontSize: "0.9rem", lineHeight: 1.8, letterSpacing: "0.1em" }}>
                上のチャートから点にカーソルを合わせるか<br />クリックすると銘柄の詳細が表示されます
              </div>
            )}
          </div>
        </div>

      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { transform: translate(-50%,-50%) scale(1); opacity: 0.7; }
          50% { transform: translate(-50%,-50%) scale(1.3); opacity: 0.3; }
        }
      `}</style>
    </div>
  );
}
