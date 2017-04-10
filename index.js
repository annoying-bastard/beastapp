  window.beasts = (() => {
    var plan = [
      '####################',
      '#__________________#',
      '#__________T_______#',
      '#_______________o__#',
      '#____o_____________#',
      '#__________________#',
      '#__________________#',
      '#___________O______#',
      '#__________________#',
      '#____T_____________#',
      '####################'
    ]

    const state = {
      plan: plan.map((string) => string.split('')),
      beasts: [],
    };

    const getVectorContent = (state, vector) => {
      return plan[vector.y][vector.x];
    }

    const checkIfTraversable = (plan, vector) => {
      if(vector && plan && plan[vector.y][vector.x] === '_') { return true; }
      else { return false; }
    }

    class Beast {
      constructor() {
        this.x = Math.floor(Math.random() * 7);
        this.y = Math.floor(Math.random() * 7);
        this.move = this.move.bind(this);
        this.newVector={};
      }

      placeBeast(plan) {
        if (checkIfTraversable(state.plan, this)){
          plan[this.y][this.x] = 'B';
          state.beasts.push(this);
        }
      }

      move() {
        var direction = Math.floor(Math.random() * 4);
        this.newVector.x = this.x;
        this.newVector.y = this.y;

        switch(direction){
          case 0:
            this.newVector.x++
            break;
          case 1:
            this.newVector.y++;
            break;
          case 2:
            this.newVector.x--;
            break;
          case 3:
            this.newVector.y--;
            break;
          default:
            break;
        }

        if (checkIfTraversable(state.plan, this.newVector)){
          updatePlan(this, '_');
          this.x = this.newVector.x;
          this.y = this.newVector.y;
          updatePlan(this, 'B');
        }
      }
    }

    const updatePlan = (vector, newTile) => {
      state.plan[vector.y][vector.x] = newTile;
    }

    const render = (state) => {
      let app = document.getElementById('app')
      app.innerHTML = null;
      state.plan.map((curr) => curr.join(''))
        .map((curr) => {
          let tr = document.createElement('tr')
          let td = document.createElement('td')
          let div = document.createElement('div')
          div.innerText = curr
          td.appendChild(div)
          tr.appendChild(td)
          app.appendChild(tr)
        })
    }

    const tick = () => {
      if (state.beasts.length < 4){
        let beast = new Beast();
        beast.placeBeast(state.plan);
      }
      state.beasts.map((curr) => curr.move());
      render(state);
    }

    let run;

    const start = (speed) => {
        run = setInterval(tick, speed || 1000);
    }

    const stop = () => {
      clearInterval(run);
    }

    return { start, stop }
  })();
