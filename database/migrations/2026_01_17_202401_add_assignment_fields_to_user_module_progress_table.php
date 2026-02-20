<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('user_module_progress', function (Blueprint $table) {
            if (!Schema::hasColumn('user_module_progress', 'submission_text')) {
                $table->text('submission_text')->nullable()->after('is_completed');
            }
            if (!Schema::hasColumn('user_module_progress', 'submission_file')) {
                $table->string('submission_file')->nullable()->after('submission_text');
            }
            if (!Schema::hasColumn('user_module_progress', 'status')) {
                $table->string('status')->default('started')->after('submission_file'); // started, submitted, graded
            }
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('user_module_progress', function (Blueprint $table) {
            //
        });
    }
};
