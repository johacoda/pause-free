const fs=require('fs');
const MS='/home/claude/MS/svg/400/outlined';
const need = {
  // chrome + nav
  home:'home', waves:'waves', monitoring:'monitoring', person:'person',
  arrow_back:'arrow_back', arrow_forward:'arrow_forward', close:'close', lock:'lock', add:'add',
  volume_up:'volume_up', volume_off:'volume_off', expand_more:'keyboard_arrow_down', lightbulb:'lightbulb', light_mode:'light_mode', dark_mode:'dark_mode',
  share:'share', download:'download', delete:'delete',
  // type presets
  smoking_rooms:'smoking_rooms', sports_bar:'sports_bar', cake:'cake', devices:'devices',
  casino:'casino', fastfood:'fastfood', local_cafe:'local_cafe', shopping_bag:'shopping_bag',
  '18_up_rating':'18_up_rating',
  // custom picker
  bolt:'bolt', local_fire_department:'local_fire_department', eco:'eco', menu_book:'menu_book',
  sports_esports:'sports_esports', headphones:'headphones', local_drink:'local_drink', cookie:'cookie',
  laptop_mac:'laptop_mac', directions_run:'directions_run', bedtime:'bedtime', chat_bubble:'chat_bubble',
  shopping_cart:'shopping_cart', fitness_center:'fitness_center', local_pizza:'local_pizza', savings:'savings',
  mood:'mood', favorite:'favorite',
  // plan suggestion icons
  local_drink2:'local_drink', park:'park', self_improvement:'self_improvement',
  call:'call', directions_walk:'directions_walk', schedule:'schedule',
};
const icons={};
for(const [key,file] of Object.entries(need)){
  let svg=fs.readFileSync(`${MS}/${file}.svg`,'utf8');
  const inner=svg.replace(/^[\s\S]*?<svg[^>]*>/,'').replace(/<\/svg>\s*$/,'').trim();
  icons[key]=inner;
}
const woff2=fs.readFileSync('/home/claude/PJS/fonts/webfonts/PlusJakartaSans[wght].woff2');
const b64=woff2.toString('base64');
const fontface=`@font-face{font-family:'Plus Jakarta Sans';font-style:normal;font-weight:300 800;font-display:swap;src:url(data:font/woff2;base64,${b64}) format('woff2');}`;
fs.writeFileSync('assets.json', JSON.stringify({icons, fontface}));
console.log('icons:',Object.keys(icons).length,'| font b64 KB:',Math.round(b64.length/1024),'| assets.json KB:',Math.round(fs.statSync('assets.json').size/1024));
