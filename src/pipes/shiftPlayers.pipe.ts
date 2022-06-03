import { Pipe, PipeTransform } from '@angular/core';
import { Player } from 'src/models/player.class';
@Pipe({
    name: 'shiftPlayer',
    pure: false
})

export class ShiftPlayerPipe implements PipeTransform {
    transform(players: Player[], currentPlayer: number) {
        if (currentPlayer == 0) {
            return players;
        } else {
            return players.slice(currentPlayer).concat(players.slice(0, currentPlayer));
        }
    }
}