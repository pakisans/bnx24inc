import sys, json
from fontTools.ttLib import TTFont
from fontTools.varLib.instancer import instantiateVariableFont
from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.pens.transformPen import TransformPen

FONT = sys.argv[1]
def outline(text, wght, size, tracking_em, x0=0, baseline=0):
    f = TTFont(FONT)
    f = instantiateVariableFont(f, {"wght": wght})
    upm = f["head"].unitsPerEm
    cmap = f.getBestCmap(); gs = f.getGlyphSet(); hmtx = f["hmtx"]
    s = size / upm
    pen = SVGPathPen(gs, ntos=lambda v: ("%.2f" % v).rstrip("0").rstrip("."))
    x = x0
    for ch in text:
        g = cmap[ord(ch)]
        tp = TransformPen(pen, (s, 0, 0, -s, x, baseline))
        gs[g].draw(tp)
        x += hmtx[g][0] * s + tracking_em * size
    x -= tracking_em * size
    return pen.getCommands(), x
spec = json.loads(sys.argv[2])
out = {}
for k, v in spec.items():
    d, end = outline(**v)
    out[k] = {"d": d, "end": round(end, 2)}
print(json.dumps(out))
