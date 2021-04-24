
class DrumKit {
	constructor() {
		this.pads = document.querySelectorAll('.pad');
		this.playBtn = document.querySelector('.play');
		this.currentKick = '/sounds/kick-classic.wav';
		this.currentSnare = '/sounds/snare-acoustic01.wav';
		this.currentHihat = '/sounds/hihat-acoustic01.wav';
		this.currentBass = '/sounds/kick-thump.wav';
		this.kickAud = document.querySelector('.kick-sound');
		this.snareAud = document.querySelector('.snare-sound');
		this.hihatAud = document.querySelector('.hihat-sound');
		this.bassAud = document.querySelector('.bass-sound');
		this.index = 0;
		this.bpm = 150;
		this.isPlaying = null;
		this.selects = document.querySelectorAll('select');
		this.muteBtns = document.querySelectorAll('.mute');
		this.tempoSlider = document.querySelector('.tempo');
	}
	activePad() {
		this.classList.toggle('active');

	}
	repeat() {

		let step = this.index % 8;
		let activeBars = document.querySelectorAll(`.b${step}`);
		activeBars.forEach(bar => {
			bar.style.animation = `playTrack 0.3s alternate ease-in-out 2`;
			if(bar.classList.contains('active')) {
				if(bar.classList.contains('kick-pad')) {
					this.kickAud.currentTime = 0;
					this.kickAud.play();
				}
				if(bar.classList.contains('snare-pad')) {
					this.snareAud.currentTime = 0;
					this.snareAud.play();
				}
				if(bar.classList.contains('hihat-pad')) {
					this.hihatAud.currentTime = 0;
					this.hihatAud.play();
				}
				if(bar.classList.contains('bass-pad')) {
					this.bassAud.currentTime = 0;
					this.bassAud.play();
				}
			}
		});
		this.index++;
	}
	start() {
		const interval = (60 / this.bpm) * 1000;
		if(!this.isPlaying) {
				this.isPlaying = setInterval(() => {
				this.repeat();
			}, interval);
		} else {
			clearInterval(this.isPlaying);
			this.isPlaying = null;
		}
		
		
	}
	updateBtn() {
		if(!this.isPlaying) {
			this.playBtn.innerHTML = '<i class="fas fa-play"></i>';
			this.playBtn.classList.remove('active');			
		} else {
			this.playBtn.innerHTML = '<i class="fas fa-stop"></i>';
			this.playBtn.classList.add('active');
		}
	}
	changeSound(e) {
		const selectionName = e.target.name;
		const selectionValue = e.target.value;
		switch(selectionName) {

			case 'kick-select':
				this.kickAud.src = selectionValue;
				break;
			case 'snare-select':
				this.snareAud.src = selectionValue;
				break;
			case 'hihat-select':
				this.hihatAud.src = selectionValue;
				break;
			case 'bass-select':
				this.bassAud.src = selectionValue;
				break;
			}
	}
	mute(e) {
		const muteIndex = e.target.getAttribute('data-track');
		e.target.classList.toggle('active');
		if(e.target.classList.contains('active')) {
				switch(muteIndex) {
					case '0':
						this.kickAud.volume = 0;
						break;
					case '1':
						this.snareAud.volume = 0;
						break;
					case '2':
						this.hihatAud.volume = 0;
						break;
					case '3':
						this.bassAud.volume = 0;
						break;
				} 
			}	else {
				switch(muteIndex) {
					case '0':
						this.kickAud.volume = 1;
						break;
					case '1':
						this.snareAud.volume = 1;
						break;
					case '2':
						this.hihatAud.volume = 1;
						break;
					case '3':
						this.bassAud.volume = 1;
				}
		}

	}
	changeTempo(e) {
		const tempoText = document.querySelector('.tempo-nr');
		tempoText.innerText = e.target.value;
	}
	updateTempo(e) {
		this.bpm = e.target.value;
		clearInterval(this.isPlaying);
		this.isPlaying = null;		
		if(this.playBtn.classList.contains('active')) {
			this.start();
		}

	}
}

const drumKit = new DrumKit();

// Event Listeners

drumKit.pads.forEach(pad => {
	pad.addEventListener('click', drumKit.activePad);
	pad.addEventListener('animationend', function() {
		this.style.animation = '';
	});
});

drumKit.playBtn.addEventListener('click', function() {
	drumKit.start();
	drumKit.updateBtn();
});

drumKit.selects.forEach(select => {
	select.addEventListener('change', function(e) {
		drumKit.changeSound(e);
	});
});

drumKit.muteBtns.forEach(btn => {
	btn.addEventListener('click', function(e) {
		drumKit.mute(e);
	});
});

drumKit.tempoSlider.addEventListener('input', function(e) {
	drumKit.changeTempo(e);
});

drumKit.tempoSlider.addEventListener('change', function(e) {
	drumKit.updateTempo(e);
});
