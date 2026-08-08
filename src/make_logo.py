from PIL import Image
import base64, io, json
def load_square(path, padfrac=0.09):
    src=Image.open(path).convert('RGBA')
    bbox=src.split()[3].getbbox(); im=src.crop(bbox)
    w,h=im.size; s=max(w,h); pad=int(s*padfrac); S=s+2*pad
    cv=Image.new('RGBA',(S,S),(0,0,0,0)); cv.paste(im,((S-w)//2,(S-h)//2),im); return cv
def uri(img,size,bg=None):
    x=img
    if bg is not None:
        b=Image.new('RGBA',img.size,bg); b.alpha_composite(img); x=b
    x=x.resize((size,size),Image.LANCZOS)
    buf=io.BytesIO(); x.save(buf,'PNG',optimize=True)
    return 'data:image/png;base64,'+base64.b64encode(buf.getvalue()).decode()
color=load_square('/root/.claude/uploads/92e26b5d-1148-5e7c-9790-7fbbf42d9fc1/14cb371d-pausecolorlogo.webp')
dark=load_square('/root/.claude/uploads/92e26b5d-1148-5e7c-9790-7fbbf42d9fc1/a419dcf3-pause_dark.webp')
out={'fav':uri(color,64), 'logo':uri(color,200), 'appicon':uri(color,180,(250,250,250,255)), 'logodark':uri(dark,200)}
json.dump(out, open('logo.json','w'))
print('logo',len(out['logo'])//1024,'KB | logodark',len(out['logodark'])//1024,'KB')

# --- full horizontal lockups for the splash ---
def load_trim(path):
    im=Image.open(path).convert('RGBA'); return im.crop(im.split()[3].getbbox())
def uri_w(img,w):
    h=round(img.height*(w/img.width)); x=img.resize((w,h),Image.LANCZOS)
    buf=io.BytesIO(); x.save(buf,'PNG',optimize=True)
    return 'data:image/png;base64,'+base64.b64encode(buf.getvalue()).decode()
lockC=load_trim('/root/.claude/uploads/92e26b5d-1148-5e7c-9790-7fbbf42d9fc1/cb8b1e1b-pa_ko__7.png')
lockD=load_trim('/root/.claude/uploads/92e26b5d-1148-5e7c-9790-7fbbf42d9fc1/c6fee539-pa_ko__6.png')
d=json.load(open('logo.json'))
d['lockup']=uri_w(lockC,560); d['lockupdark']=uri_w(lockD,560)
d['lockup_ar']=round(lockC.width/lockC.height,3)
json.dump(d, open('logo.json','w'))
print('lockup KB', len(d['lockup'])//1024, '| dark KB', len(d['lockupdark'])//1024, '| aspect', d['lockup_ar'])
