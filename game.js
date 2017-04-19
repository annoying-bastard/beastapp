
module.exports = () => {
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

    const getVectorContent = (plan, vector) => {
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
        this.energy = 5;
        this.id = Math.floor(Math.random()*(this.x+this.y));
      }

      placeBeast(plan) {
        if (checkIfTraversable(state.plan, this)){
          plan[this.y][this.x] = 'B';
          state.beasts.push(this);
        }
      }

      // Does not work correctly yet
      removeBeast() {
        state.plan = updatePlan(state.plan, this, 'x');
        state.beasts = state.beasts.filter((curr) => !(curr.id === this.id)) // filters true or false?
      }

      // Does not work correctly yet
      useEnergy(amount){
        if (this.energy <= 0) this.removeBeast()
        amount ? this.energy - amount : this.energy--;
      }

      move() {
        this.useEnergy();
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
          state.plan = updatePlan(state.plan, this, '_');
          this.x = this.newVector.x;
          this.y = this.newVector.y;
          state.plan = updatePlan(state.plan, this, 'B');
        }
      }
    }

    const updatePlan = (plan, vector, newTile) => {
      plan[vector.y][vector.x] = newTile;
      return plan;
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
    if (process.env.NODE_ENV === 'test') {
      return { start, stop, getVectorContent, checkIfTraversable, updatePlan }
    }
    return { start, stop }
  }
