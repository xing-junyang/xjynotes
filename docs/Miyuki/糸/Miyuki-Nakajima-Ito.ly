\version "2.24.3"

\header {
	title = "ITO"
	composer = "Originally Composed By Miyuki Nakajima"
	arranger = " "
	tagline = ##f
	subtitle = "　"
	dedication = "　"
}

melody = \relative{
  \clef treble
  \key f \major
  \numericTimeSignature
  \time 4/4
  \repeat volta 2 {
  a'4 a8. a16 a8 g f d |
  c a'16 a~ a4 r8 f a c |
  d a16 a~ a4 c8 a16 a~ a4 |
  a4 g8 f16 g16~ g4 r4 |
  a4 a8. a16 a8 g f d |
  c a'16 a~ a4 r8 f a c |
  d a16 a~ a4 c8 a16 a~ a4 |
  a4 g8 f16 g16~ g4 f16 g a8|
  a4 f' e8. d16 c16 a8. |
  f4 d c f16 g a8 |
  a g16 f8. a8 c4 a16 g a8 |
  bes4 c8. c16 (d8) c a g |
  f4 r16 c f a a8 g f e16 f~|
  f2 r2|
  bes4 r16 f bes d d8 c f, a16 a(|
  g2) r4 a8 g|
  f g a f16 a~ a4 a8 g|
  
  }
  \alternative { 
  {
  f g a f16 f'~ f4 r16 f, g a |  bes8 c a bes16 g~ g4 bes16 a g8|
  f2. r4|}
  {
  f8 g a f16 f'~ f4 r16 f, g a |  bes8 c a bes16 g~ g4 bes16 a g8|
  f2. r4|
  }}
  f4 r16 c f a a8 g f e16 f~|
  f2 r2|
  bes4 r16 f bes d d8 c f, a16 a(|
  g2) r4 a8 g|
  f g a f16 a~ a4 a8 g|
  f g a f16 f'~ f4 r16 f, g a|
  bes8 c a bes16 g~ g4 bes16 a g8|
  f2. r4|
  \bar "|."
}


\score {
  
  <<
    \chords{
      f2 bes f2. c4/e d2:m a:m7 g2:m7 g4:m7/c c
      f2 bes f2. c4/e d2:m a:m7 g2:m7 c4 cis:dim
      d2:m a:m7 bes f4 c4/e 
      d2:m a:m7 g:m7 g4:m7/c c:7
      f2 c/e d2. f4/c
      bes2 f/a g:m c4: cis:dim
      d2.:m d4:maj7m
      d2:m7/c ces2:7.5-
      bes2 c:sus4
      f2 r2
      d2:m7/c ces2:7.5-
      bes2 c:sus4
      f2 r2
      f2 c/e d2. f4/c
      bes2 f/a g:m c4: cis:dim
      d2.:m d4:maj7m
      d2:m7/c ces2:7.5-
      bes2 c:sus4
      f2
      
    }

    \new Staff {
      \new Voice = "melody"
      \melody
    }
   
  >>
}
