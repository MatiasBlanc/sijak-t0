import { mkdir } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';
import { media } from '../lib/media';
import type { RoleId } from '../lib/roles';

// Ilustraciones originales de montaje: no representan fotografías ni prototipos validados.
const escapeXml = (text: string): string =>
  text.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('"', '&quot;');

const scenes: Record<RoleId, string> = {
  ankle: `
    <path d="M368-40H594L578 246 560 343 532 515 331 518 351 279Z" fill="#656767" stroke="#858786" stroke-width="2"/>
    <path d="M391-20 411 248 381 442" stroke="#969895" stroke-opacity=".3" stroke-width="18" fill="none"/>
    <path d="M527 10 514 239 473 466" stroke="#414546" stroke-width="38" fill="none"/>
    <path d="M330 374Q433 398 557 373L534 572 522 698 619 788 546 839 311 780 304 666Z" fill="#222729" stroke="#575e60" stroke-width="2"/>
    <path d="M330 374Q433 398 557 373L534 572 522 698 619 788 546 839 311 780 304 666Z" fill="url(#rib)"/>
    <path d="M325 406Q433 427 550 405M322 418Q433 439 550 417" stroke="#727777" stroke-opacity=".45" stroke-width="3" fill="none"/>
    <path d="M319 519Q424 547 543 518L537 586Q428 611 312 583Z" fill="#101314" stroke="#676c6c" stroke-width="3"/>
    <path d="M319 519Q424 547 543 518L537 586Q428 611 312 583Z" fill="url(#weave)"/>
    <path d="M324 528Q425 553 539 528M318 574Q421 600 535 577" stroke="#858b88" stroke-width="1" stroke-dasharray="4 5" fill="none"/>
    <path d="M303 711Q362 748 430 728L476 700Q517 717 533 753L636 837Q674 851 718 854 765 866 770 899L747 933 510 933 409 906 287 890Q258 828 276 750Z" fill="#303639" stroke="#757c7e" stroke-width="3"/>
    <path d="M303 728 292 824 388 867 500 895 728 905 728 884 607 865 514 802 461 737 428 754 380 768Z" fill="#1c2022"/>
    <path d="M292 824 388 867 500 895 728 905" fill="none" stroke="#545e61" stroke-width="3"/>
    <path d="M285 864Q358 869 416 894L518 916 768 902 763 931 726 951 512 949 407 924 286 909Z" fill="#949b99" stroke="#b2b6b0" stroke-width="2"/>
    <path d="M289 892 407 907 515 933 753 921" fill="none" stroke="#3d4446" stroke-width="3"/>
    <path d="m457 759 57 4m-37 16 57 7m-37 14 57 9m-34 11 53 13" stroke="#adb2b0" stroke-width="6" stroke-linecap="round"/>
    <path d="M329 781 350 826 399 845M574 860l78 22" stroke="#727a7e" stroke-width="4" fill="none"/>

  `,
  wrist: `
    <g transform="rotate(-23 450 550)">
      <path d="M331 1140 318 750 323 513 483 485 559 784 599 1140Z" fill="#666a6a" stroke="#929792" stroke-width="2"/>
      <path d="M362 1058 370 740 359 528" stroke="#91948f" stroke-width="22" fill="none"/>
      <path d="M506 1064 483 770 453 545" stroke="#444b4d" stroke-width="43" fill="none"/>
      <path d="M321 502 280 407Q262 362 278 319L304 226Q311 203 337 204L443 210Q463 211 474 235L501 302 514 371 475 504Z" fill="#252a2c" stroke="#777d7e" stroke-width="3"/>
      <path d="M321 502 280 407Q262 362 278 319L304 226Q311 203 337 204L443 210Q463 211 474 235L501 302 514 371 475 504Z" fill="url(#weave)"/>
      <path d="m293 279 188 40m-192-9 204 39m-207-7 218 38m-209-1 195 35m-181 1 168 31m-154 5 146 26m-132 8 117 22" stroke="#687173" stroke-width="5" fill="none"/>
      <path d="M445 300Q394 300 378 346L361 402Q361 424 390 426L456 380 480 344Z" fill="#31383a" stroke="#838987" stroke-width="2"/>
      <path d="m392 340 62 20m-74 3 62 18m-73 4 50 18" stroke="#5c6568" stroke-width="4"/>
      <path d="M317 506Q395 527 485 505L503 585Q410 611 320 586Z" fill="#131719" stroke="#7c8280" stroke-width="3"/>
      <path d="M317 506Q395 527 485 505L503 585Q410 611 320 586Z" fill="url(#weave)"/>
      <path d="M324 516Q403 537 481 515M328 577Q414 596 494 577" stroke="#868c88" stroke-width="1" stroke-dasharray="4 5" fill="none"/>

    </g>
  `,
  paddle: `
    <g transform="rotate(17 450 550)">
      <path d="M436 597 446 899Q465 926 498 906L495 593Z" fill="#272d30" stroke="#767c7e" stroke-width="4"/>
      <path d="M447 694 494 692m-46 20 46-2m-45 20 46-2m-45 20 46-2m-45 20 46-2m-45 20 46-2m-45 20 46-2m-45 20 46-2m-45 20 46-2m-45 20 46-2" stroke="#62696a" stroke-width="4"/>
      <path d="M351 190Q452 145 556 193 635 237 619 352 611 434 514 565L495 652 433 655 402 565Q289 439 290 346 277 234 351 190Z" fill="#131719" stroke="#858c8d" stroke-width="4"/>
      <path d="M350 214Q451 173 549 217 609 250 595 348 581 448 493 553L477 620 451 622 425 552Q314 414 312 343 297 259 350 214Z" fill="#242a2d" stroke="#535d61" stroke-width="2"/>
      <path d="M350 214Q451 173 549 217 609 250 595 348 581 448 493 553L477 620 451 622 425 552Q314 414 312 343 297 259 350 214Z" fill="url(#grain)"/>
      <path d="M333 323Q335 239 404 231M429 557l30 48" fill="none" stroke="#8b9292" stroke-width="3"/>
      <path d="M303 370Q353 485 427 565" fill="none" stroke="#07090a" stroke-width="6"/>
      <path d="M430 658h76v56h-75Z" fill="#0e1113" stroke="#8b918e" stroke-width="2"/>
      <path d="M430 658h76v56h-75Z" fill="url(#weave)"/>
      <path d="M470 902Q420 1008 457 1029 516 1029 498 907" fill="none" stroke="#6d7575" stroke-width="12"/>
      <path d="M470 902Q420 1008 457 1029 516 1029 498 907" fill="none" stroke="#252c2e" stroke-width="7"/>

    </g>
  `,
  shield: `
    <g transform="rotate(-8 450 550)">
      <path d="M260 190Q450 137 656 203L726 327 710 821Q532 952 262 863L195 745 202 303Z" fill="#0c1011" stroke="#697276" stroke-width="3"/>
      <path d="M241 239Q437 186 651 241L675 794Q458 886 245 808Z" fill="#252c2f" stroke="#818b8d" stroke-width="3"/>
      <path d="M259 259Q440 208 633 260L655 778Q456 861 265 793Z" fill="url(#grain)" stroke="#5b6567" stroke-width="2" stroke-dasharray="4 6"/>
      <path d="M682 336 707 361 698 789 680 807M694 357l-7 424" stroke="#424c50" stroke-width="3" fill="none"/>
      <path d="m264 432 391-12v83l-390 11Z" fill="#111719" stroke="#697778" stroke-width="3"/>
      <path d="m264 432 391-12v83l-390 11Z" fill="url(#weave)"/>
      <path d="m273 442 372-12m-371 74 373-12" stroke="#7b8585" stroke-width="1" stroke-dasharray="5 5"/>
      <path d="m272 666 384-12v78l-382 10Z" fill="#111719" stroke="#697778" stroke-width="3"/>
      <path d="m272 666 384-12v78l-382 10Z" fill="url(#weave)"/>
      <path d="M334 437V379Q335 356 355 356H380Q400 356 400 379V435M516 431V373Q517 350 537 350H562Q582 350 582 373V429" stroke="#0a0d0f" stroke-width="29" fill="none"/>
      <path d="M334 430V379Q335 356 355 356H380Q400 356 400 379V428M516 424V373Q517 350 537 350H562Q582 350 582 373V422" stroke="#717b7d" stroke-width="2" fill="none"/>
      <path d="M353 673V627Q353 608 370 608H393Q410 608 410 627V670M512 669V623Q512 604 529 604H552Q569 604 569 623V666" stroke="#0a0d0f" stroke-width="24" fill="none"/>
      <path d="M291 536h335M298 570h321" stroke="#394347" stroke-width="2"/>

    </g>
  `,
  body: `
    <path d="M157-60Q450-2 712-58L715 172 757 386 701 561 214 572 141 403 177 181Z" fill="#242a2d" stroke="#667075" stroke-width="3"/>
    <path d="M157-60Q450-2 712-58L715 172 757 386 701 561 214 572 141 403 177 181Z" fill="url(#grain)"/>
    <path d="M220 33 246 185 216 368 243 484M648 44 614 188 660 398 646 490" stroke="#3c464b" stroke-width="4" fill="none"/>
    <path d="m231 294 70 131-27 73m350-234-70 131 21 67" fill="none" stroke="#111719" stroke-width="15"/>
    <path d="M214 516Q450 562 701 505L756 715 739 1140H490L451 858 411 1140H146L157 739Z" fill="#1a2024" stroke="#687278" stroke-width="3"/>
    <path d="M214 516Q450 562 701 505L713 579Q463 640 192 590Z" fill="#101618" stroke="#71797b" stroke-width="3"/>
    <path d="M214 516Q450 562 701 505L713 579Q463 640 192 590Z" fill="url(#rib)"/>
    <path d="M204 583Q450 627 711 573M218 530Q450 579 699 519" fill="none" stroke="#89918e" stroke-width="1" stroke-dasharray="4 5"/>
    <path d="M249 625 219 1018M657 618 700 1021M450 658l1 200M247 658l71 9-41 142M649 646l-72 9 50 142" stroke="#465157" stroke-width="3" fill="none"/>
    <path d="M439 613 423 722M466 613l16 108" stroke="#7b8586" stroke-width="4" fill="none"/>
    <path d="M581 510h69v111h-69Z" fill="#0b0f10" stroke="#697578" stroke-width="3"/>

  `,
};

async function generate(): Promise<void> {
  await mkdir(path.resolve('public/media/roles'), { recursive: true });
  const mounts: Record<RoleId, { x: number; y: number; size: number; angle: number }> = {
    ankle: { x: 454, y: 557, size: 112, angle: 4 },
    wrist: { x: 422, y: 562, size: 104, angle: -23 },
    paddle: { x: 427, y: 687, size: 90, angle: 17 },
    shield: { x: 443, y: 464, size: 84, angle: -8 },
    body: { x: 616, y: 576, size: 96, angle: -5 },
  };
  for (const [id, scene] of Object.entries(scenes)) {
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="900" height="1100" viewBox="0 0 900 1100">
    <defs>
      <pattern id="grain" width="7" height="7" patternUnits="userSpaceOnUse"><circle cx="1" cy="2" r=".65" fill="#e1e6e1" opacity=".15"/><circle cx="5" cy="5" r=".6" fill="#000" opacity=".35"/></pattern>
      <pattern id="weave" width="6" height="6" patternUnits="userSpaceOnUse"><path d="M0 1h6M1 0v6" stroke="#abb3b1" stroke-opacity=".2" stroke-width="1"/></pattern>
      <pattern id="rib" width="8" height="5" patternUnits="userSpaceOnUse"><path d="M1 0v5M4 0v5" stroke="#9aa39e" stroke-opacity=".22" stroke-width="1"/></pattern>
      <pattern id="grid" width="90" height="90" patternUnits="userSpaceOnUse"><path d="M90 0H0V90" stroke="#f7f7f2" stroke-opacity=".025" fill="none"/></pattern>
    </defs>
    <rect width="900" height="1100" fill="#121416"/>
    <rect width="900" height="1100" fill="url(#grid)"/>
    <ellipse cx="463" cy="580" rx="324" ry="341" fill="none" stroke="#f7f7f2" stroke-opacity=".05"/>
    <ellipse cx="463" cy="580" rx="288" ry="305" fill="none" stroke="#f7f7f2" stroke-opacity=".025"/>
    ${scene}
  </svg>`;
    const output = path.resolve('public', media.roles[id as RoleId].slice(1));
    const mount = mounts[id as RoleId];
    const device = await sharp(path.resolve('public/t0-render.png'))
      .resize(mount.size, mount.size, { fit: 'contain' })
      .rotate(mount.angle, { background: '#00000000' })
      .png()
      .toBuffer();
    const { width = mount.size, height = mount.size } = await sharp(device).metadata();
    await sharp(Buffer.from(svg))
      .composite([
        {
          input: device,
          left: Math.round(mount.x - width / 2),
          top: Math.round(mount.y - height / 2),
        },
      ])
      .webp({ quality: 86 })
      .toFile(output);
  }
}

generate().catch((error: unknown) => {
  process.stderr.write(`No se pudieron generar los montajes: ${String(error)}\n`);
  process.exitCode = 1;
});
