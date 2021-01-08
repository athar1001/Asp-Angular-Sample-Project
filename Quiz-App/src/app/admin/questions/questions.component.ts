import { Component, OnInit } from '@angular/core';
import { QuestionService } from '../shared/question.service';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css']
})
export class QuestionsComponent implements OnInit {

  constructor(public service : QuestionService,
    private toastr : ToastrService) { }

  ngOnInit(): void {
    this.resetForm();
  }

      resetForm(from? : ngForm){
        if(form != null)
        form.resetForm();
        this.service.formData = {
          QnID: null, 
          Qn: ' ',
          ImageName:' ',
          Option1: ' ',
          Option2:' ',
          Option3:' ',
          Option4:' ',
          Answer:' '
        }
      }

      onSubmit(form : ngForm){
        this.insertRecord(form);
      }

      insertRecord(form : NgForm){
        this.service.postQuestion(form.value).subscribe(res => {
          this.toastr.success('Question Inserted Successfully', 'Quiz-App . Register');
          this.resetForm(form)
        });
      }
}
