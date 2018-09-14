import { Component, OnInit } from '@angular/core';

import { ServersService } from '../servers.service';
import { ActivatedRoute, Router, Data } from '@angular/router';

@Component({
  selector: 'app-server',
  templateUrl: './server.component.html',
  styleUrls: ['./server.component.css']
})
export class ServerComponent implements OnInit {
  server: { id: number, name: string, status: string };

  constructor(private serversService: ServersService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {

    this.route.data.subscribe((data: Data) =>{
      this.server = data['server'];
    })

    // this.server = this.serversService.getServer(Number(this.route.snapshot.params['id']));

    // this.route.params.subscribe((params: Params) => {
    //   this.server = this.serversService.getServer(Number(params['id']));
    // })
  }

  onEditServer() {
    this.router.navigate(['edit'], { relativeTo: this.route, queryParamsHandling: 'preserve' });
  }
}
