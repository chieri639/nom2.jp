"use client";

import { useState } from "react";

const sakeData = [
  // 左上: 甘口・スッキリ（x<50, y>50）
  { id: 1, name: "純米吟醸\nなでしこの花酵母", short: "なでしこ", x: 22, y: 78, emoji: "🌸", desc: "花のような上品な甘み。初心者にも大人気" },
  { id: 2, name: "純米大吟醸\n超精米8%", short: "超精米8%", x: 30, y: 85, emoji: "✨", desc: "雑味ゼロの究極の透明感。フルーティーで軽快" },
  { id: 3, name: "大吟醸\n蔵元限定醸造 機械栓", short: "蔵元限定", x: 18, y: 70, emoji: "🏷️", desc: "蔵元こだわりの華やか系大吟醸" },
  { id: 4, name: "大吟醸\n雫", short: "雫", x: 28, y: 90, emoji: "💧", desc: "雫取りの最高峰。エレガントで繊細" },
  // 右上: 辛口・スッキリ（x>50, y>50）
  { id: 5, name: "純米吟醸\nいちごの花酵母", short: "いちご花酵母", x: 62, y: 75, emoji: "🍓", desc: "名前は甘そうだが実はキレ系。ギャップが面白い！" },
  { id: 6, name: "純米吟醸\n亀の尾", short: "亀の尾", x: 75, y: 68, emoji: "🐢", desc: "古代米「亀の尾」使用。キレがあり食中酒として最適" },
  // 左下: 甘口・しっかり（x<50, y<50）
  { id: 7, name: "貴醸酒\nMELLOW オーク樽熟成", short: "MELLOW", x: 20, y: 22, emoji: "🍯", desc: "デザート感覚で楽しむ濃厚な甘み。ウイスキー好きにも" },
  // 右下: 辛口・しっかり（x>50, y<50）
  { id: 8, name: "純米吟醸生原酒\n愛山", short: "愛山", x: 68, y: 38, emoji: "⛰️", desc: "幻の酒米「愛山」。旨みと力強さが共存" },
  { id: 9, name: "純米酒\n安康", short: "安康", x: 60, y: 25, emoji: "🌾", desc: "米の旨みをしっかり感じる定番の食中酒" },
  { id: 10, name: "純米大吟醸\n別誂", short: "別誂", x: 78, y: 32, emoji: "🎌", desc: "日本酒通をうならせる本格派。余韻が長い" },
  { id: 11, name: "真向勝負\n純米大吟醸", short: "真向勝負", x: 85, y: 18, emoji: "⚔️", desc: "その名の通り正面勝負。辛口でコクが深い" },
  { id: 12, name: "純米吟醸生原酒\nX 黒", short: "X 黒", x: 72, y: 15, emoji: "⬛", desc: "生原酒ならではのパワフルな旨み。上級者向け" },
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
      background: "transparent", // let parent bg show
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

        {/* Side panel */}
        <div style={{ width: 220, display: "flex", flexDirection: "column", gap: "1rem" }}>
          {/* Info card */}
          <div style={{
            background: displaySake ? "rgba(44,26,14,0.9)" : "rgba(44,26,14,0.6)",
            border: `1px solid ${displaySake ? "rgba(240,200,128,0.5)" : "rgba(180,130,60,0.2)"}`,
            padding: "1.2rem",
            minHeight: 140,
            transition: "all 0.3s ease",
          }}>
            {displaySake ? (
              <>
                <div style={{ fontSize: "1.2rem", marginBottom: "0.4rem" }}>{displaySake.emoji}</div>
                <div style={{ color: "#f0c880", fontSize: "0.8rem", fontWeight: 700, lineHeight: 1.4, marginBottom: "0.5rem", whiteSpace: "pre-wrap" }}>
                  {displaySake.name}
                </div>
                <div style={{ color: "#c4a882", fontSize: "0.68rem", lineHeight: 1.6, letterSpacing: "0.05em" }}>
                  {displaySake.desc}
                </div>
                <div style={{ marginTop: "0.8rem", display: "flex", gap: 4 }}>
                  <span style={{ fontSize: "0.55rem", color: "#8b7355", background: "rgba(139,115,85,0.15)", padding: "2px 6px", borderRadius: 2 }}>
                    X: {displaySake.x < 50 ? "甘口寄り" : "辛口寄り"}
                  </span>
                  <span style={{ fontSize: "0.55rem", color: "#8b7355", background: "rgba(139,115,85,0.15)", padding: "2px 6px", borderRadius: 2 }}>
                    Y: {displaySake.y > 50 ? "スッキリ" : "しっかり"}
                  </span>
                </div>
              </>
            ) : (
              <div style={{ color: "#6b5540", fontSize: "0.68rem", lineHeight: 1.8, letterSpacing: "0.1em", marginTop: "0.5rem" }}>
                点にカーソルを合わせるか<br />クリックすると銘柄の<br />詳細が表示されます
              </div>
            )}
          </div>

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

          {/* Tip */}
          <div style={{
            background: "rgba(44,26,14,0.5)",
            border: "1px solid rgba(139,115,85,0.2)",
            padding: "0.8rem",
            fontSize: "0.6rem",
            color: "#8b7355",
            lineHeight: 1.8,
            letterSpacing: "0.05em",
          }}>
            <span style={{ color: "#c09060", fontWeight: 700 }}>接客のコツ</span><br />
            ①「スッキリ派？コク派？」<br />
            ②「甘口？辛口？」<br />
            の2問で象限が決まります
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
