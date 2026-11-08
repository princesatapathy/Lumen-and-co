# Reference vs Paper design — numeric comparison (1280)

Ref = live site measured. Paper = our Paper HTML rendered in Chrome with the same CSS. "Δ" shows mismatches only. Copy-length differences change heights; they are flagged separately.

## header
- section padding: ref 0 0 0 0 vs paper 0 98 0 98
- section bg: ref oklab(0.958767 0.000745952 0.012695 / 0.9) vs paper color(srgb 0.952941 0.945098 0.917647 / 0.9)
- ui-text type (size/lh/ls/weight): ref 15/24/0/500, 15/22.5/0/600 vs paper 15/24/0/500, 15/normal/0/600
- ui-text[0] x: ref 438 vs paper 427
- ui-text[1] x: ref 536 vs paper 505
- ui-text[2] x: ref 661 vs paper 603

## hero
- section height: ref 838 vs paper 713 (Δ -125)
- section padding: ref 0 0 0 0 vs paper 0 11 0 98
- section bg: ref rgba(0, 0, 0, 0) vs paper rgb(243, 241, 234)
- eyebrow[0] x: ref 98 vs paper 135
- h1: count ref 1 vs paper 2
- h1 type (size/lh/ls/weight): ref 122.88/110.59/-9.22/800 vs paper 123/111/-9.22/800
- accent type (size/lh/ls/weight): ref 122.88/110.59/-2.46/800, 24/32/-0.48/400 vs paper 123/normal/-2.46/800, 26/normal/0/400
- accent[1] x: ref 937 vs paper 923
- ui-text: count ref 27 vs paper 15
- ui-text type (size/lh/ls/weight): ref 16/24/0/600, 12/16/0/600, 14/20/0/600 vs paper 16/normal/0/600, 12/16/0/600, 14/20/0/600
- ui-text[1] x: ref 267 vs paper 296
- card: count ref 25 vs paper 13
- display-small: count ref 24 vs paper 12
- pill[0]: w 376→258, h 586→34, radius 33554400→9999, pad 0 0 0 0→9 18 9 18, bg oklab(0.390338 -0.0123062 -0.128285 / 0.35)→rgb(235, 230, 216)

## marquee
- (marquee is inside the reference hero section) paper height 125

## statement
- section height: ref 522 vs paper 526 (Δ 4)
- section padding: ref 112 0 112 0 vs paper 112 98 112 98
- eyebrow type (size/lh/ls/weight): ref 12/16/1.68/600 vs paper 12/normal/1.68/600
- eyebrow[0] x: ref 98 vs paper 120
- ui-text: count ref 1 vs paper 0
- ui-text type (size/lh/ls/weight): ref 14/20/1.68/600 vs paper 
- accent[0] x: ref 245 vs paper 281

## work
- section padding: ref 112 0 112 0 vs paper 112 98 112 98
- section bg: ref rgb(245, 241, 232) vs paper rgb(243, 241, 234)
- eyebrow type (size/lh/ls/weight): ref 12/16/1.68/600 vs paper 12/normal/1.68/600
- eyebrow[0] x: ref 98 vs paper 120
- ui-text: count ref 4 vs paper 3
- ui-text type (size/lh/ls/weight): ref 14/20/1.68/600, 15/24/0/600 vs paper 15/normal/0/600
- ui-text[1] x: ref 98 vs paper 467
- ui-text[2] x: ref 467 vs paper 836
- accent[0] x: ref 208 vs paper 301
- body: count ref 4 vs paper 1
- body type (size/lh/ls/weight): ref 18/29.25/0/400, 30/36/0/400 vs paper 18/29.25/0/400
- card[0]: bg rgb(255, 255, 255)→rgb(201, 207, 232)
- card[1]: bg rgb(255, 255, 255)→rgb(216, 205, 189)
- card[2]: bg rgb(255, 255, 255)→rgb(191, 211, 200)

## deliverables
- section padding: ref 112 0 112 0 vs paper 112 98 112 98
- eyebrow type (size/lh/ls/weight): ref 12/16/1.68/600 vs paper 12/normal/1.68/600
- eyebrow[0] x: ref 98 vs paper 120
- ui-text: count ref 11 vs paper 0
- ui-text type (size/lh/ls/weight): ref 14/20/1.68/600, 14/20/0/400 vs paper 
- body type (size/lh/ls/weight): ref 17/23.38/0/400, 17/23.38/0/600 vs paper 17/23.4/0/400, 17/23.4/0/600
- body[2] x: ref 694 vs paper 124

## process
- section height: ref 1024 vs paper 1031 (Δ 7)
- section padding: ref 112 0 112 0 vs paper 112 98 112 98
- section bg: ref rgb(245, 241, 232) vs paper rgb(243, 241, 234)
- eyebrow type (size/lh/ls/weight): ref 12/16/1.68/600 vs paper 12/normal/1.68/600
- eyebrow[0] x: ref 98 vs paper 120
- ui-text: count ref 1 vs paper 0
- ui-text type (size/lh/ls/weight): ref 14/20/1.68/600 vs paper 
- body type (size/lh/ls/weight): ref 18/29.25/0/400, 17/27.63/0/400 vs paper 18/29.25/0/400, 17/27.6/0/400

## plans
- section height: ref 961 vs paper 974 (Δ 13)
- section padding: ref 112 0 112 0 vs paper 112 98 112 98
- eyebrow type (size/lh/ls/weight): ref 12/16/1.68/600, 12/16/1.2/600 vs paper 12/normal/1.68/600, 12/normal/1.2/600
- eyebrow[0] x: ref 98 vs paper 120
- ui-text: count ref 3 vs paper 2
- ui-text type (size/lh/ls/weight): ref 14/20/1.68/600, 16/24/0/600 vs paper 16/normal/0/600
- ui-text[0] x: ref 98 vs paper 139
- ui-text[1] x: ref 139 vs paper 695
- accent[0] x: ref 422 vs paper 446
- body type (size/lh/ls/weight): ref 18/29.25/0/400, 17/27.2/0/400, 17/23.38/0/400 vs paper 18/29.25/0/400, 17/27/0/400, 17/23.4/0/400
- body[2] x: ref 139 vs paper 173
- card[0]: bg rgb(251, 249, 244)→rgb(250, 249, 245)
- card[1]: bg rgb(33, 63, 137)→rgb(45, 63, 166)

## band
- section padding: ref 96 0 96 0 vs paper 96 98 96 98
- section bg: ref rgb(33, 63, 137) vs paper rgb(45, 63, 166)
- ui-text type (size/lh/ls/weight): ref 14/20/0/500 vs paper 13/normal/0/600
- body[0] x: ref 626 vs paper 692

## about
- section height: ref 925 vs paper 908 (Δ -17)
- section padding: ref 112 0 112 0 vs paper 112 98 112 98
- section bg: ref rgb(245, 241, 232) vs paper rgb(243, 241, 234)
- eyebrow type (size/lh/ls/weight): ref 12/16/1.68/600 vs paper 12/normal/1.68/600
- eyebrow[0] x: ref 98 vs paper 120
- ui-text: count ref 4 vs paper 3
- ui-text type (size/lh/ls/weight): ref 14/20/1.68/600, 16/24/0/600, 14/20/0/500 vs paper 16/normal/0/600, 14/20/0/400
- ui-text[1] x: ref 98 vs paper 296
- ui-text[2] x: ref 267 vs paper 745
- body type (size/lh/ls/weight): ref 17/27.63/0/400 vs paper 17/27/0/400
- card[0]: bg rgb(251, 249, 244)→rgb(201, 207, 232)

## faq
- section height: ref 951 vs paper 947 (Δ -4)
- section padding: ref 112 0 112 0 vs paper 112 98 112 98
- eyebrow type (size/lh/ls/weight): ref 12/16/1.68/600 vs paper 12/normal/1.68/600
- eyebrow[0] x: ref 98 vs paper 120
- ui-text: count ref 1 vs paper 0
- ui-text type (size/lh/ls/weight): ref 14/20/1.68/600 vs paper 
- h3 type (size/lh/ls/weight): ref 22/30.25/-0.44/700 vs paper 22/normal/-0.44/700
- body: count ref 1 vs paper 8
- body type (size/lh/ls/weight): ref 17/27.63/0/400 vs paper 26/26/0/400, 17/27/0/400
- body[0] x: ref 98 vs paper 1165

## contact-cta
- section padding: ref 112 48 112 48 vs paper 112 98 112 98
- section bg: ref rgba(0, 0, 0, 0) vs paper rgb(243, 241, 234)
- card[0]: bg rgb(33, 63, 137)→rgb(45, 63, 166)
- eyebrow type (size/lh/ls/weight): ref 12/16/1.68/600 vs paper 12/normal/1.68/600
- eyebrow[0] x: ref 508 vs paper 581
- ui-text: count ref 2 vs paper 1
- ui-text type (size/lh/ls/weight): ref 14/20/1.68/600, 16/24/0/600 vs paper 16/normal/0/600
- ui-text[0] x: ref 508 vs paper 543
- h2: count ref 2 vs paper 1
- h2[0] x: ref 306 vs paper 260
- accent[0] x: ref 570 vs paper 516
- body[0] x: ref 302 vs paper 380

## footer
- section padding: ref 0 0 0 0 vs paper 64 98 40 98
- section bg: ref rgb(17, 17, 17) vs paper rgb(18, 19, 15)
- ui-text type (size/lh/ls/weight): ref 15/24.38/0/400, 15/24/0/400, 14/20/0/400 vs paper 15/22/0/400, 15/24/0/400, 14/normal/0/400
- eyebrow type (size/lh/ls/weight): ref 12/16/1.68/600 vs paper 12/normal/1.68/600


Total mismatch lines: 110
