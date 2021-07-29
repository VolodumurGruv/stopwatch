export function msToHms(msElapsed) {
  const zero = (val: number) => String(val).padStart(2, '0');

  msElapsed = Number(msElapsed);

  const hElapsed = msElapsed / 360000;
  const hRemaining = hElapsed % 24;
  const sRemaining = (hRemaining * 3600) % 3600;
  const ms = Math.floor((sRemaining % 1) * 100);

  const h = Math.floor(hRemaining);
  const m = Math.floor(sRemaining / 60);
  const s = Math.floor(sRemaining % 60);

  const hShow = h > 0 ? `${zero(h)}:` : '';
  const mShow = `${zero(m)}:`;
  const sShow = `${zero(s)}:`;
  const msShow = zero(ms);

  return `${hShow}${mShow}${sShow}${msShow}`;
}
