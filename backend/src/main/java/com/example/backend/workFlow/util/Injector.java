package com.example.employee.workFlow.util;

import com.example.employee.service.facade.*;
import com.example.employee.workFlow.detailSalaire.calcSalary.CalcSalaryProcess;
import com.example.employee.workFlow.detailSalaire.calcSalary.CalcSalaryProcessImpl;
import com.example.employee.workFlow.detailSalaire.save.DetailSalaireSaveProcess;
import com.example.employee.workFlow.detailSalaire.save.DetailSalaireSaveProcessImpl;
import com.example.employee.workFlow.detailSalaire.update.DetailSalaireUpdateProcess;
import com.example.employee.workFlow.detailSalaire.update.DetailSalaireUpdateProcessImpl;
import com.example.employee.workFlow.echelle.delete.EchelleDeleteProcess;
import com.example.employee.workFlow.echelle.delete.EchelleDeleteProcessImpl;
import com.example.employee.workFlow.echelle.save.EchelleSaveProcess;
import com.example.employee.workFlow.echelle.save.EchelleSaveProcessImpl;
import com.example.employee.workFlow.echelle.update.EchelleUpdateProcess;
import com.example.employee.workFlow.echelle.update.EchelleUpdateProcessImpl;
import com.example.employee.workFlow.echelon.delete.EchelonDeleteProcess;
import com.example.employee.workFlow.echelon.delete.EchelonDeleteProcessImpl;
import com.example.employee.workFlow.echelon.save.EchelonSaveProcess;
import com.example.employee.workFlow.echelon.save.EchelonSaveProcessImpl;
import com.example.employee.workFlow.echelon.update.EchelonUpdateProcess;
import com.example.employee.workFlow.echelon.update.EchelonUpdateProcessImpl;
import com.example.employee.workFlow.employe.delete.EmployeDeleteProcess;
import com.example.employee.workFlow.employe.delete.EmployeDeleteProcessImpl;
import com.example.employee.workFlow.employe.save.EmployeSaveProcess;
import com.example.employee.workFlow.employe.save.EmployeSaveProcessImpl;
import com.example.employee.workFlow.employe.update.EmployeUpdateProcess;
import com.example.employee.workFlow.employe.update.EmployeUpdateProcessImpl;
import com.example.employee.workFlow.entiteAdministarif.delete.EntiteAdministarifDeleteProcess;
import com.example.employee.workFlow.entiteAdministarif.delete.EntiteAdministarifDeleteProcessImpl;
import com.example.employee.workFlow.entiteAdministarif.save.EntiteAdministarifSaveProcess;
import com.example.employee.workFlow.entiteAdministarif.save.EntiteAdministarifSaveProcessImpl;
import com.example.employee.workFlow.entiteAdministarif.update.EntiteAdministarifUpdateProcess;
import com.example.employee.workFlow.entiteAdministarif.update.EntiteAdministarifUpdateProcessImpl;
import com.example.employee.workFlow.grade.delete.GradeDeleteProcess;
import com.example.employee.workFlow.grade.delete.GradeDeleteProcessImpl;
import com.example.employee.workFlow.grade.save.GradeSaveProcess;
import com.example.employee.workFlow.grade.save.GradeSaveProcessImpl;
import com.example.employee.workFlow.grade.update.GradeUpdateProcess;
import com.example.employee.workFlow.grade.update.GradeUpdateProcessImpl;
import com.example.employee.workFlow.mandat.save.MandatSaveProcess;
import com.example.employee.workFlow.mandat.save.MandatSaveProcessImpl;
import com.example.employee.workFlow.mandat.update.MandatUpdateProcess;
import com.example.employee.workFlow.mandat.update.MandatUpdateProcessImpl;
import com.example.employee.workFlow.responsibility.save.ResponsibilitySaveProcess;
import com.example.employee.workFlow.responsibility.save.ResponsibilitySaveProcessImpl;
import com.example.employee.workFlow.responsibility.update.ResponsibilityUpdateProcess;
import com.example.employee.workFlow.responsibility.update.ResponsibilityUpdateProcessImp;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class Injector {

    @Bean
    public ResponsibilityUpdateProcess responsibilityUpdateProcess(
            ResponsibilityService responsibilityService,
            MandatService mandatService,
            EchelonService echelonService) {
        return new ResponsibilityUpdateProcessImp(
                responsibilityService,
                echelonService,
                mandatService);
    }

    @Bean
    public ResponsibilitySaveProcess responsibilitySaveProcess(
            ResponsibilityService responsibilityService,
            EchelonService echelonService) {
        return new ResponsibilitySaveProcessImpl(responsibilityService, echelonService);
    }

    @Bean
    public MandatUpdateProcess mandatUpdateProcess(
            MandatService mandatService,
            ResponsibilityService responsibilityService,
            EmployeService employeService) {
        return new MandatUpdateProcessImpl(
                mandatService,
                responsibilityService,
                employeService);
    }

    @Bean
    public MandatSaveProcess mandatSaveProcess(
            MandatService mandatService,
            ResponsibilityService responsibilityService,
            EmployeService employeService) {
        return new MandatSaveProcessImpl(
                mandatService,
                responsibilityService,
                employeService);
    }

   @Bean
    public EntiteAdministarifSaveProcess entiteAdministarifSaveProcess(
           EntiteAdministarifService entiteAdministarifService,
           EmployeService employeService) {
        return new EntiteAdministarifSaveProcessImpl( entiteAdministarifService, employeService );
   }

   @Bean
    public EntiteAdministarifUpdateProcess entiteAdministarifUpdateProcess(
            EntiteAdministarifService entiteAdministarifService,
            EmployeService employeService) {
        return new EntiteAdministarifUpdateProcessImpl(entiteAdministarifService,employeService);
   }

   @Bean
    public EmployeSaveProcess employeSaveProcess(
            EmployeService employeService,
            EchelonService echelonService,
            EntiteAdministarifService entiteAdministarifService) {
        return new EmployeSaveProcessImpl(employeService,echelonService,entiteAdministarifService);
   }

   @Bean
    public EmployeUpdateProcess employeUpdateProcess(
            EmployeService employeService,
            EchelonService echelonService,
            EntiteAdministarifService entiteAdministarifService) {
        return new EmployeUpdateProcessImpl(
                employeService,
                echelonService,
                entiteAdministarifService);
   }

    @Bean
    public EmployeDeleteProcess employeDeleteProcess(
            EmployeService employeService,
            EmployeArchiveService employeArchiveService,
            EntiteAdministarifService entiteAdministarifService,
            MandatService mandatService,
            DetailSalaireService salaireService) {
        return new EmployeDeleteProcessImpl(
                employeService,
                employeArchiveService,
                entiteAdministarifService,
                mandatService,
                salaireService);
    }

    @Bean
    public DetailSalaireSaveProcess detailSalaireSaveProcess(
            DetailSalaireService detailSalaireService,
            EmployeService employeService,
            MandatService mandatService,
            DetailSalaireUpdateProcess detailSalaireUpdateProcess){
        return new DetailSalaireSaveProcessImpl(
                detailSalaireService,
                employeService,
                mandatService,
                detailSalaireUpdateProcess);
    }

    @Bean
    public DetailSalaireUpdateProcess detailSalaireUpdateProcess(
            DetailSalaireService salaireService) {
        return new DetailSalaireUpdateProcessImpl(salaireService);
    }

    @Bean
    public CalcSalaryProcess calcSalaryProcess(
            EmployeService employeService,
            DetailSalaireSaveProcess detailSalaireSaveProcess){
        return new CalcSalaryProcessImpl(employeService,detailSalaireSaveProcess);
    }

    @Bean
    public EchelonSaveProcess echelonSaveProcess(
            EchelonService echelonService,
            EchelleService echelleService) {
        return new EchelonSaveProcessImpl(echelonService, echelleService);
    }

    @Bean
    public EchelonUpdateProcess echelonUpdateProcess(
            EchelonService echelonService,
            EchelleService echelleService,
            EmployeService employeService) {
        return new EchelonUpdateProcessImpl(echelonService, echelleService,employeService);
    }

    @Bean
    public EchelonDeleteProcess echelonDeleteProcess(
            EchelonService echelonService,
            EmployeService employeService,
            EmployeDeleteProcess employeDeleteProcess) {
        return new EchelonDeleteProcessImpl(echelonService,employeService,employeDeleteProcess);
    }

    @Bean
    public EntiteAdministarifDeleteProcess entiteAdministarifDeleteProcess(
            EntiteAdministarifService entiteAdministarifService,
            EmployeService employeService,
            EmployeDeleteProcess employeDeleteProcess) {
        return new EntiteAdministarifDeleteProcessImpl(
                entiteAdministarifService,
                employeService,
                employeDeleteProcess);
    }

    @Bean
    public EchelleSaveProcess echelleSaveProcess(
            EchelleService echelleService,
            GradeService gradeService) {
        return new EchelleSaveProcessImpl(echelleService,gradeService);
    }

    @Bean
    public EchelleUpdateProcess echelleUpdateProcess(
            EchelleService echelleService,
            GradeService gradeService) {
        return new EchelleUpdateProcessImpl(echelleService,gradeService);
    }

    @Bean
    public EchelleDeleteProcess echelleDeleteProcess(
            EchelleService echelleService,
            EchelonService echelonService,
            EchelonDeleteProcess echelonDeleteProcess) {
        return new EchelleDeleteProcessImpl(echelleService,echelonService,echelonDeleteProcess);
    }

    @Bean
    public GradeSaveProcess gradeSaveProcess(GradeService gradeService) {
        return new GradeSaveProcessImpl(gradeService);
    }

    @Bean
    public GradeUpdateProcess gradeUpdateProcess(GradeService gradeService) {
        return new GradeUpdateProcessImpl(gradeService);
    }

    @Bean
    public GradeDeleteProcess gradeDeleteProcess(
            GradeService gradeService,
            EchelleService echelleService,
            EchelleDeleteProcess echelleDeleteProcess) {
        return  new GradeDeleteProcessImpl(gradeService, echelleService, echelleDeleteProcess);
    }

}
